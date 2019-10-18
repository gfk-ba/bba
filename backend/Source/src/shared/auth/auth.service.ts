/**
 * Contains the [[AuthService]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as logger from '../logger';
import { UserService } from '../../user/user.service';

/**
 * The AuthService provide functions to create a token [[createToken]] and to validate the payload of a token [[validateUser]].
 */
@Injectable()
export class AuthService {
  /**
   * Use dependency injection to get access to the [[JwtService]] and [[UserService]]
   * @param jwtService We use the [[JwtService]] to create a new token.
   * @param userService We use the [[UserService]] to lookup a user by email.
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * This async function creates a new token for the given email address.
   * @param email The email address for which the token should be created.
   * @returns An object with the timeout and access token.
   */
  async createToken(email: string) {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);

    logger.log(
      `AuthService.createToken - accessToken für ${email}`,
      accessToken,
    );

    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  /**
   * This async function validates the JWT payload, especially whether there's a user with the given email address.
   * @param payload The JwtPayload from which we get the email address.
   * @returns An object with the id and email of the matching user or null, if the no matching user was found.
   */
  async validateUser(payload: JwtPayload): Promise<any> {
    let result = null;

    if (payload && payload.email) {
      // does the user (still) exist?
      const user = await this.userService.findByEmail(payload.email);

      // Is there still a token for the user in the database?
      if (user && user.token) {
        result = { id: user.id, email: user.email };
      }
    }

    return result;
  }
}
