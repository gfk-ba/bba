/**
 * Contains the [[LinkService]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import * as logger from '../shared/logger';

/**
 * The LinkService provides functions to find and create links in the database
 */
@Injectable()
export class LinkService {
  /**
   * Use dependency injection to get access to the linkRepository
   * @param linkRepository the repository for links (used to access the database table links)
   */
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) {}

  /**
   * This async function retrieves a list of all (!) links
   * @returns a mapping from each (source document) id to a list of all linked (targed document) id.
   */
  async findAll() {
    // Note: If we ever run into performance issues, this could be a good place to start optimizing,
    // e.g. by getting only the links for a specific user or a specific project.

    const linkList = await this.linkRepository.find({});

    const linksPerDocument = {};

    linkList.forEach((link: Link) => {
      const sourceId = link.sourceDocumentId;
      const targetId = link.targetDocumentId;
      const targetIds = linksPerDocument[sourceId] || [];
      targetIds.push(targetId);
      linksPerDocument[sourceId] = targetIds;
    });

    return linksPerDocument;
  }

  /**
   * This async function retrieves a list of links, which have the given document (specified by sourceDocumentId) as a source.
   * @param sourceDocumentId The id if the document for which we want to the get all links, where this document is the source.
   * @returns A list of links.
   */
  async findAllLinksForDocument(sourceDocumentId: number) {
    logger.log(
      'LinkService.findAllLinksForDocument - sourceDocumentId',
      sourceDocumentId,
    );

    const result = await this.linkRepository.find({ sourceDocumentId });

    logger.log('LinkService.findAllLinksForDocument - result', result);

    return result;
  }

  /**
   * This async function creates a new link in the database
   * @param sourceId the id of the source document
   * @param targetId the id of the target document
   * @returns The new link which was created in the database
   */
  async create(sourceId: number, targetId: number): Promise<Link> {
    const link = new Link(sourceId, targetId);
    return await this.linkRepository.save(link);
  }
}
