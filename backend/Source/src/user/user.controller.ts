/**
 * This files contains the UserController
 */

/**
 * import all the stuff we need from NestJS and our code
 */
import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as logger from '../shared/logger';

/**
 * The UserController provides a method to create a user [[createUser]].
 * All methods are accessible at http://SERVER:PORT/users
 */
@Controller('users')
export class UserController {
  /**
   * Use dependency injection to access the [[UserService]].
   * @param userService We use the [[UserService]] to find an create users in the database
   */
  constructor(private readonly userService: UserService) {}

  /**
   * This async function creates a new user given the data in the userDto.
   * @param userDto The UserDto which contains the data (email and password) of the user we should create.
   * ```
   *   curl -X POST \
   *     http://SERVER:PORT/users \
   *     -H 'Cache-Control: no-cache' \
   *     -H 'Content-Type: application/x-www-form-urlencoded' \
   *     -d 'email=MY_EMAIL_ADDRESS&password=MY_SUPER_SECRET_PASSWORD'
   * ```
   */
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<any> {
    logger.log('UserController.createUser - userDto', userDto);

    // userDto should like this...
    // {
    //   email:    "MY_EMAIL_ADDRESS",
    //   password: "MY_SUPER_SECRET_PASSWORD"
    // }

    const existingUser = await this.userService.findByEmail(userDto.email);

    if (existingUser) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const savedUser = await this.userService.createUser(
      userDto.email,
      userDto.password,
    );

    logger.log('UserController.createUser - savedUser', savedUser);

    return savedUser;
  }
}
