/**
 * Contains the [[DocumentService]]
 */

/**
 * Import NestJS and TypeORM stuff
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Document } from './document.entity';
import { LinkService } from '../link/link.service';
import { PaymentService } from '../payment/payment.service';

import * as logger from '../shared/logger';
import { ContractService } from '../contract/contract.service';
import { ProjectService } from '../project/project.service';
import { Link } from '../link/link.entity';

/**
 * The DocumentService provides a lot of functions to find documents, their links etc.
 */
@Injectable()
export class DocumentService {
  /**
   * Use dependency injection to get access lots of services
   * @param documentRepository the repository for documents (used to access the database table documents)
   * @param projectService the service for the projects (e.g. lookup projects)
   * @param linkService the service for links  (e.g. lookup liks to a document)
   * @param paymentService the payment service (e.g. store payment data - either coupons or PayPal)
   * @param contractService the contract service (e.g. create a contract on the blockchain for the document)
   */
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private projectService: ProjectService,
    private linkService: LinkService,
    private paymentService: PaymentService,
    private contractService: ContractService,
  ) {}

  /**
   * This async function retrieves the list of all documents (including links) for the given user id
   * @param userId The id of the user for whom we want the list of all documents.
   * @returns The list of all documents (including links) or http 417 if the user id is missing/empty.
   */
  async findAll(userId: number): Promise<any[]> {
    if (!userId) {
      throw new HttpException(
        'userId missing in DocumentService.findAll',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const result = await this.findAllForUserId(userId);
    const linksGroupedBySource = await this.linkService.findAll();

    const resultList = result.map((doc: any) =>
      this.addLinks(doc, linksGroupedBySource),
    );

    return resultList;
  }

  /**
   * This async function retrieves a list of documents from the given list of document ids.
   * @param listOfDocIds The list of document ids.
   * @returns The list of the documents.
   */
  async findAllForDocIds(
    listOfDocIds: Array<number>,
  ): Promise<Array<Document>> {
    if (!listOfDocIds || !listOfDocIds.length) {
      return [];
    }

    const result = await this.documentRepository.manager
      .createQueryBuilder(Document, 'document')
      .where('document.id IN (:...listOfDocIds)', {
        listOfDocIds,
      })
      .printSql()
      .getMany();

    return result;
  }

  /**
   * This async function retrieves the list of all linked documents of the given document id
   * @param sourceDocumentId The id of the document for which we want all linked documents
   * @returns The list of linked documents.
   */
  async findAllLinkedDocs(sourceDocumentId: number): Promise<Array<Document>> {
    logger.log('findAllLinkedDocs - sourceDocumentId', sourceDocumentId);

    // Get all the links from the source document
    const allLinks =
      (await this.linkService.findAllLinksForDocument(sourceDocumentId)) || [];

    // .. get the ids of the target documents
    const allTargetDocIds = allLinks.map((link: Link) => link.targetDocumentId);

    // .. and get the document for each (target document) id
    const result = await this.findAllForDocIds(allTargetDocIds);

    logger.log('findAllLinkedDocs - result', result);

    return result;
  }

  /**
   * Add all links (more precise: a list of the ids for all linked documents) to document.
   * @param doc The document to which we want to add the links.
   * @param linksGroupedBySource A data structure which contains a hash with source document id as key and an array of target document ids as value.
   */
  private addLinks(doc: Document, linksGroupedBySource: any) {
    const result: any = doc;
    result.linkIds = linksGroupedBySource[result.id] || [];
    return result;
  }

  /**
   * This private async helper function retrieves the list of all document for the given user (specified by userId).
   * @param userId The id of the user for whom we want get the list of documents.
   * @returns The list of all documents (without links) for the given user (specified by userId)
   */
  private async findAllForUserId(userId: number): Promise<Array<Document>> {
    logger.log(`DocumentService.findAllForUserId(${userId})`);

    const projects = await this.projectService.findAll(userId);

    if (projects && projects.length) {
      const projectIds = projects.map(p => p.id);

      const result = await this.documentRepository.manager
        .createQueryBuilder(Document, 'document')
        .where('document.project_id IN (:...projects)', {
          projects: projectIds,
        })
        .printSql()
        .getMany();

      return result;
    }

    return [];
  }

  /**
   * This async function creates a new document for the given user  (specified by userId).
   * @param userId The id of the user for whom we want to create a new document.
   * @param documentDto The data of the document we should create.
   * @returns the new document (including state information)
   */
  async createDocument(
    userId: number,
    documentDto: DocumentDto,
  ): Promise<Document> {
    logger.log(`DocumentService.createDocument(${userId}, ${documentDto})`);

    // projectId shoudl contains something like this ...
    // {projectId: "3",
    // kind: "result",
    // hash: "212121",
    // description: "ttttt",
    // linkIds: [2, 4]}

    if (!userId) {
      throw new HttpException(
        'userId missing in DocumentService.createDocument',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    // We could improve security here by double-checking that the project (specified by documentDto.projectId)
    // belongs to the user (specified by userId)

    const NEW_DOCUMENT = new Document();
    NEW_DOCUMENT.projectId = parseInt(documentDto.projectId, 10);
    NEW_DOCUMENT.kind = documentDto.kind;
    NEW_DOCUMENT.hash = documentDto.hash;
    NEW_DOCUMENT.description = documentDto.description;
    NEW_DOCUMENT.createdAt = new Date();

    logger.log('DocumentService.createDocument - doc', NEW_DOCUMENT);

    const SAVED_DOCUMENT = await this.documentRepository.save(NEW_DOCUMENT);

    logger.log(
      'DocumentService.createDocument - savedDocument',
      SAVED_DOCUMENT,
    );

    const result = await this.findById(SAVED_DOCUMENT.id);
    logger.log('DocumentService.createDocument - result', result);

    await this.storeLinksToDoc(SAVED_DOCUMENT.id, documentDto);
    await this.processPaymentData(SAVED_DOCUMENT.id, documentDto.payment || {});

    // Alternative solution without await:
    // this.addToBlockchain(savedDocument, documentDto).then(address => {
    //   this.documentRepository.update(savedDocument.id, {
    //     address,
    //     state: 'OK',
    //     stateDetails:
    //       'Successfully saved in the ethereum blockchain at ' + new Date(),
    //   });
    // });

    const address = await this.addToBlockchain(SAVED_DOCUMENT, documentDto);

    logger.log(
      `DocumentService.createDocument - blockchain address = ${address}`,
    );

    SAVED_DOCUMENT.address = address;
    SAVED_DOCUMENT.state = 'OK';
    SAVED_DOCUMENT.stateDetails =
      'Successfully saved in the ethereum blockchain at ' + new Date();

    const DOC_FROM_DATABASE = await this.documentRepository.save(
      SAVED_DOCUMENT,
    );

    logger.log(
      `DocumentService.createDocument - nach addToBlockchain -  DOC_FROM_DATABASE = `,
      DOC_FROM_DATABASE,
    );

    return SAVED_DOCUMENT;
  }

  /**
   * This private async helper function stores a document in the blockchain.
   * @param savedDocument the document that should be stored in the blockchain
   * @param documentDto The document DTO, we use this to get the blockchain addresses of the linked documents
   * @returns the blockchain address of the document
   */
  private async addToBlockchain(
    savedDocument: Document,
    documentDto: DocumentDto,
  ): Promise<string> {
    const addressesOfLinkedDocs = await this.getAdressesOfLinksToDoc(
      documentDto,
    );

    return await this.contractService.createContract(
      savedDocument.hash,
      addressesOfLinkedDocs,
    );
  }

  /**
   * This private async helper function creates links (in the database) from the document
   * (specified by sourceDocumentId) to the linked documents (stored in the documentDto)
   * @param sourceDocumentId the id of the document that's the source of a created links
   * @param documentDto The document DTO which already contains a list of target ids
   */
  private async storeLinksToDoc(
    sourceDocumentId: number,
    documentDto: DocumentDto,
  ) {
    logger.log(
      'DocumentService.storeLinksToDoc -  documentDto.linkIds',
      documentDto.linkIds,
    );

    const linkIds = this.getIdsOfLinkedDocuments(documentDto);

    linkIds.forEach(async targetId => {
      logger.log('DocumentService.storeLinksToDoc - targetId', targetId);
      await this.linkService.create(sourceDocumentId, targetId);
    });
  }

  /**
   * This private helper function retrieves of list of id belonging to the target documents for the given document
   * (specified by documentDto)
   * @param documentDto The document DTO from which we get the target documents ids
   * @returns The list of ids belonging to the documents linked to the documentDto
   */
  private getIdsOfLinkedDocuments(documentDto: DocumentDto): Array<number> {
    let linkIds = [];

    if (
      documentDto &&
      documentDto.linkIds &&
      Array.isArray(documentDto.linkIds)
    ) {
      linkIds = documentDto.linkIds;
    }

    logger.log('DocumentService.getIdsOfLinkedDocuments - linkIds', linkIds);

    return linkIds;
  }

  /**
   * This private async helper function retrieves of list of blockchain addresses belonging to the target documents for the given document
   * (specified by documentDto)
   * @param documentDto The document DTO from which we get the target documents ids
   * @returns The list of blockchain addresses belonging to the documents linked to the documentDto
   */
  private async getAdressesOfLinksToDoc(
    documentDto: DocumentDto,
  ): Promise<Array<string>> {
    const linkIds = this.getIdsOfLinkedDocuments(documentDto);
    const linkedDocs = await this.findAllForDocIds(linkIds);
    const result = linkedDocs.map(document => document.address || '');

    logger.log('DocumentService.getAdressesOfLinksToDoc - result', result);

    return result;
  }

  /**
   * This private async helper function will double check and store the payment data
   * @param documentId The id of document from which we check+save the payment data.
   * @param paymentData The payment data. The structure depends on the payment method (PayPal or coupon)
   * @returns true, if the payment data is consistent and can be saved, false if not.
   */
  private async processPaymentData(documentId: number, paymentData: any) {
    logger.log('DocumentService.processPaymentData - started', {
      documentId,
      paymentData,
    });

    if (!paymentData.coupon && !paymentData.paypal) {
      logger.log(
        'DocumentService.processPaymentData - ERROR no valid payment method found',
        {
          documentId,
          paymentData,
        },
      );
      return false;
    }

    if (paymentData.coupon && paymentData.paypal) {
      logger.log(
        'DocumentService.processPaymentData - ERROR only one payment method may be provided',
        { documentId, paymentData },
      );
      return false;
    }

    logger.log(`DocumentService.processPaymentData - paymentData`, paymentData);

    let payment;

    if (paymentData.coupon) {
      payment = await this.paymentService.storeCouponPayment(
        documentId,
        paymentData.coupon,
      );
    } else {
      payment = await this.paymentService.storePayPalPayment(
        documentId,
        paymentData.paypal,
      );
    }

    logger.log('DocumentService.processPaymentData - payment record', payment);

    return true;
  }

  /**
   * This function will double check the payment data
   * @param documentDto The document DTO from which we get the payment data (at least we hope ...)
   * @returns true, if the payment data is consistent, false if not.
   */
  hasValidPaymentData(documentDto: DocumentDto): boolean {
    // Note: There's some overlapping functionality with processPaymentData
    // Refactoring could reduce duplicate code

    const paymentData = documentDto.payment;

    if (!paymentData) {
      logger.log(
        'DocumentService.hasValidPaymentData - ERROR no payment data found',
        {
          documentDto,
        },
      );
      return false;
    }

    let result = true;

    if (!paymentData.coupon && !paymentData.paypal) {
      logger.log(
        'DocumentService.hasValidPaymentData - ERROR no valid payment method found',
        {
          paymentData,
        },
      );
      result = false;
    }

    if (paymentData.coupon && paymentData.paypal) {
      logger.log(
        'DocumentService.hasValidPaymentData - ERROR only one payment method may be provided',
        { paymentData },
      );
      result = false;
    }

    return result;
  }

  /**
   * This private async helper function will load the document (including all links) specified by the document id
   * @param documentId The id of document which we want to retrieve (including all links).
   * @returns The document (including all links).
   */
  private async findById(documentID: number): Promise<any> {
    const linksGroupedBySource = await this.linkService.findAll();
    const doc = await this.documentRepository.findOne({ id: documentID });
    const result = this.addLinks(doc, linksGroupedBySource);
    return result;
  }
}
