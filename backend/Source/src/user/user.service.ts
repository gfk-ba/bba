/**
 * Contains the [[UserService]]
 */

/**
 * Import NestJS, typeOrm, node libraries and our code
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from 'shared/auth/login.dto';
import * as logger from '../shared/logger';

/**
 * the md5 (hashing) library from NodeJS
 */
const md5 = require('md5');

/**
 * the password generator library
 */
const generator = require('generate-password');

/**
 * The UserService provide functions to create/validate/find/(...) users in the database.
 */
@Injectable()
export class UserService {
  /**
   * We use dependency injection to get access to the userRepository.
   * @param userRepository this provides database access to the database table users.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    //
  }

  /**
   * This async function resets the password of the given user (specified by user)
   * @param user An entity object containing the user for whom we want to reset the password.
   * @returns The new password.
   */
  async resetPassword(user: User): Promise<string> {
    logger.log('UserService.resetPassword - user', user);
    const newPassword = this.generatePasswrd();

    const updatedUser = await this.userRepository.update(
      { id: user.id },
      { hashedPassword: md5(newPassword) },
    );

    logger.log('UserService.resetPassword - updated user', updatedUser);

    return newPassword;
  }

  /**
   * This private helper function creates a new password using the generate-password library.
   * @returns The new password.
   */
  private generatePasswrd() {
    return generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });
  }

  /**
   * This async function will create a new user in the database with the given email and password.
   * The password will be hashed using md5 before storing it in the database.
   * @param email The email address of the new user
   * @param password The password of the new user (as text, not the hashcode)
   * @returns The new user from the database.
   */
  async createUser(email: string, password: string) {
    const user: User = new User();
    user.email = this.cleanEmailAdress(email);
    user.hashedPassword = md5(password);

    logger.log('UserService.createUser - user', user);

    const savedUser = await this.userRepository.save(user);

    logger.log('UserService.createUser - savedUser', savedUser);

    return savedUser;
  }

  /**
   * This async function will check whether the given user is in the database
   * @param userDto The user data as UserDto (password inside the DTO as text, not as hashcode)
   * @returns true if a user with the same email address and password was found, false if not.
   */
  async validateUserLogin(userDto: UserDto): Promise<boolean> {
    let result = false;

    if (userDto.email && userDto.password) {
      const email = this.cleanEmailAdress(userDto.email);
      const hashedPassword = md5(userDto.password);

      const listOfUsers = await this.userRepository.find({
        email,
        hashedPassword,
      });
      result = listOfUsers && listOfUsers.length > 0;
    }

    return result;
  }

  /**
   * This async function will search for a user with the given token.
   * @param token The user token which we will use to search in the database.
   * @returns The user with the given token (or null if not found)
   */
  async findOneByToken(token: string): Promise<User> {
    return await this.userRepository.findOne({ token });
  }

  /**
   * This async function will search for a user with the given email address.
   * @param email The email address which we will use to search in the database.
   * @returns The user with the given email address (or null if not found)
   */
  async findByEmail(email: string): Promise<User> {
    email = this.cleanEmailAdress(email);
    return await this.userRepository.findOne({ email });
  }

  /**
   * This async function will search for a user with the given email address and hashed password (specified in loginData).
   * @param loginData We use the LoginDto to get the email address and hashed password.
   * @returns The user with the given data (or null if not found).
   */
  async findByEmailAndHashedPwd(loginData: LoginDto): Promise<User> {
    if (!loginData || !loginData.email || !loginData.hashedPassword) {
      return null; // missing logindata
    }

    const email = this.cleanEmailAdress(loginData.email);

    const user = this.userRepository.findOne({
      email,
      hashedPassword: loginData.hashedPassword,
    });

    return user;
  }

  /**
   * This async function will store the given token in the user with the given email address.
   * @param email The email address of the user for whom we want to store the token.
   * @param token The token that should be stored.
   */
  async setToken(email: any, token: string) {
    logger.log('UserService.setToken(email, token) - ', email, token);
    email = this.cleanEmailAdress(email);

    await this.userRepository.update(
      { email },
      { token, lastLogin: new Date() },
    );
  }

  /**
   * This private helper method "normalizes" and email address (trim whitespace and lowercase the address)
   * @param email The email address that should be "normalized".
   * @returns The "normalized" email address or "" if the address was empty/missing.
   */
  private cleanEmailAdress(email: string): string {
    return (email || '').trim().toLowerCase();
  }
}
