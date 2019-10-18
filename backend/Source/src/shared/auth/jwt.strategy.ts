/**
 * Contains the [[JwtStrategy]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

/**
 * This class defines how the token is created/retrieved and a funcion to validate the payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Use dependency injection to get access to [[AuthService]].
   * @param authService We use AuthService to validate the email address of a user.
   */
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY,
    });
  }

  /**
   * This async function will validate a JwtPayload
   * @param payload The JwtPayload we'll use for user validation.
   * @returns An object with the id and email of the matching user. If not matching user was found, an UnauthorizedException will be thrown.
   */
  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
