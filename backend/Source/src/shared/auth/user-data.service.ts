/**
 * Contains the [[UserDataService]]
 */

/**
 * Import NestJS stuff
 */
import { Injectable } from '@nestjs/common';

/**
 * The UserDataService provides a way to extract the id of the current user from the request.
 * In addition this is a good place if you want to "hard code" the user id (for testing).
 */
@Injectable()
export class UserDataService {
  /**
   * This function extracts the id of the current user from the request.
   * @param requestData This function gets the user id from the request data/
   * @returns The id of the user (from the request data) or DEFAULT_USER_ID (if missing)/
   */
  getUserData(requestData: any) {
    const DEFAULT_USER_ID = null; // replace null with a user id (for testing purposes only!)
    const hasUserData = requestData && requestData.user && requestData.user.id;
    return hasUserData ? requestData.user.id : DEFAULT_USER_ID;
  }
}
