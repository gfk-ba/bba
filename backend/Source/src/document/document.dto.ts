/**
 * The DTO (data transfer object) used to transport document data from the frontend to the backend.
 */
interface DocumentDto {
  /**
   * The id of the project to which the document belongs.
   * To be discussed: Why is this a string?
   */
  readonly projectId: string;

  /**
   * The kind of document (just a string)
   */
  readonly kind: string;

  /**
   * The hash of the document to store in the blockchain
   */
  readonly hash: string;

  /**
   * The description of the document (given by the user)
   */
  readonly description: string;

  /**
   * The list of linked documents (as a list of ids)
   */
  readonly linkIds: any;

  /**
   * The payment data (e.g. from PayPal)
   */
  readonly payment: any;
}
