/**
 * This files contains the DocumentController
 */

/**
 * import all the stuff we need from NestJS
 */
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './document.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserDataService } from '../shared/auth/user-data.service';
import * as logger from '../shared/logger';

/**
 * The DocumentController provides methods to find all documents of an user [[findAll]] and to create/store a new document [[createDocument]].
 * All methods are accessible at http://SERVER:PORT/documents
 */
@Controller('documents')
export class DocumentController {
  /**
   * Use dependency injection to get access to the [[DocumentService]] and the [[UserDataService]].
   */
  constructor(
    private readonly documentService: DocumentService,
    private userDataService: UserDataService,
  ) {}

  /**
   * This async function delivers the list of all documents of the user, who makes the call.
   * If user data is missing or the user is unknown, the result will the the http status code 417.
   * This function can be executed by a GET call to http://SERVER:PORT/documents
   * ```
   *   curl -X GET \
   *     http://SERVER:PORT/documents \
   *     -H 'Authorization: Bearer XXXXX' \
   *     -H 'Cache-Control: no-cache'
   * ```
   * This route is restricted by [[AuthGuard]]
   * @param requestData The request data, we need this to extract the user data
   * @returns The list of document of the current user (including links to other documents).
   */
  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Req() requestData): Promise<Document[]> {
    const userId = this.userDataService.getUserData(requestData);
    if (!userId) {
      throw new HttpException(
        'userId missing in DocumentController.findAll',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const result = await this.documentService.findAll(userId);
    return result;
  }
  /**
   * This async function creates+stores a new document using the request data. The document will be associated to the user, who makes the call.
   * If user data is missing or the user is unknown, the result will the the http status code 417.
   * This function can be executed by a POST call to http://SERVER:PORT/documents
   * ```
   * curl -X POST \
   *    http://SERVER:PORT/documents \
   *   -H 'Authorization: Bearer XXXXX' \
   *   -H 'Cache-Control: no-cache' \
   *   -H 'Content-Type: application/x-www-form-urlencoded' \
   *   -d 'projectId=3&kind=result&hash=12121212&description=testdaten&linkIds=%5B2%2C%204%5D'
   * ```
   * The result should be something like this:
   * ```
   * {
   *        "projectId": 3,
   *        "kind": "result",
   *        "hash": "12121212",
   *        "description": "testdaten",
   *        "address": null,
   *        "id": 4,
   *        "state": "PROGRESS",
   *        "stateDetails": "",
   *        "createdAt": "2018-09-16"
   * }
   * ```
   * This route is restricted by [[AuthGuard]]
   * @param documentDto The data of the new document
   * @param requestData The request data, we need this to extract the user data
   * @returns the newly created document - including the database id.
   */
  @Post()
  @UseGuards(AuthGuard())
  async createDocument(
    @Body() documentDto: DocumentDto,
    @Req() requestData,
  ): Promise<any> {
    logger.log('DocumentController.createDocument - documentDto', documentDto);

    // documentDto should be something like this ....
    // {projectId: "3",
    // kind: "result",
    // hash: "212121",
    // description: "ttttt",
    // linkIds: [2, 4]}
    // payment: { }

    if (!this.documentService.hasValidPaymentData) {
      throw new HttpException(
        'payment receipt is missing',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const userId = this.userDataService.getUserData(requestData);

    const savedDocument = await this.documentService.createDocument(
      userId,
      documentDto,
    );

    logger.log(
      'DocumentController.createDocument - savedDocument',
      savedDocument,
    );

    return savedDocument;
  }
}
