/**
 * This files contains the AuthController
 */

/**
 * import all the stuff we need from NestJS and our code
 */
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as logger from '../logger';
import { UserDataService } from './user-data.service';
import { UserService } from '../../user/user.service';

/**
 * The AuthController provides methods to create a token [[createToken]] and to show the user id [[getUserData]].
 * All methods are accessible at http://SERVER:PORT/auth/...
 */
@Controller('auth')
export class AuthController {
  /**
   * Use dependency injection to get access to [[AuthService]], [[UserService]] and [[UserDataService]].
   * @param authService
   * @param userService
   * @param userDataService
   */
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userDataService: UserDataService,
  ) {}

  /**
   * This async function creates new token with the given user data (userDto)
   * This function can be executed by a POST call to http://SERVER:PORT/auth/token
   * @param userDto The user data for which we want to get a new token.
   * @returns The new token
   */
  @Post('token')
  async createToken(@Body() userDto: UserDto) {
    logger.log('createToken - userDto', userDto);

    // userDto should be something like ...
    // { email: 'john@doe.com', password: 'meinSuperSecretPassword' }

    const validUser = await this.userService.validateUserLogin(userDto);

    if (!validUser) {
      throw new HttpException('Unknown user', HttpStatus.FORBIDDEN);
    }

    const tokenData = await this.authService.createToken(userDto.email);

    await this.userService.setToken(userDto.email, tokenData.accessToken);
    return tokenData;
  }

  /**
   * This async helper function retrieves and displays the user id for the current user (mostly for debugging purposes).
   * This function can be executed by a GET call to http://SERVER:PORT/auth/data
   * This route is restricted by [[AuthGuard]].
   * This function can be removed in production.
   * @param requestData The request data, we need this to extract the user id
   * @returns A welcome message including the user id
   * ```
   *  curl -X GET \
   *    http://SERVER:PORT/auth/data \
   *    -H 'Authorization: Bearer xxx' \
   *    -H 'Cache-Control: no-cache' \
   *    -H 'Content-Type: application/x-www-form-urlencoded'
   * ```
   */
  @Get('data')
  @UseGuards(AuthGuard())
  getUserData(@Req() requestData) {
    const userId = this.userDataService.getUserData(requestData);
    return `Welcome user ${userId}`;
  }
}
