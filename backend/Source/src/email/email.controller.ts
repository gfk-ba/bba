/**
 * This files contains the EmailController
 */

/**
 * import all the stuff we need from NestJS and our code
 */
import { Controller, Body, Post, Get } from '@nestjs/common';
import * as logger from '../shared/logger';
import { EmailService } from './email.service';
import { UserService } from '../user/user.service';

/**
 * The EmailController provides a method to reset the password [[resetEmail]]
 * All methods are accessible at http://SERVER:PORT/email/...
 */
@Controller('email')
export class EmailController {
  /**
   * Use dependency injection to get access to the [[EmailService]] and the [[UserService]].
   */
  constructor(
    private emailService: EmailService,
    private userService: UserService,
  ) {}

  /**
   * Tries to reset the password of the given account (specified by the email address)
   * @param emailDto the email DTO [[EmailDto]] (contains only the email address)
   * Can be called using a HTTP POST to http://SERVER:PORT/email/reset e.g. ...
   * ```
   * curl -X POST \
   *   http://SERVER:PORT/email/reset \
   *   -H 'Cache-Control: no-cache' \
   *   -H 'Content-Type: application/x-www-form-urlencoded' \
   *   -d email=MY_EMAIL_ADDRESS
   * ```
   */
  @Post('reset')
  async resetEmail(@Body() emailDto: EmailDto): Promise<any> {
    logger.log('EmailController.resetEmail - emailDto', emailDto);

    // do we have a user with that email address?
    const existingUser = await this.userService.findByEmail(emailDto.email);

    // if we have a user with that email address, let's reset the password and send an email to the user with that new password
    if (existingUser) {
      const newPassword = await this.userService.resetPassword(existingUser);
      this.emailService.sendEmail(emailDto.email, newPassword);
    }
  }

  // You can use the code below to test, whether sending emails is working at all
  // Replace MY_EMAIL_ADDRESS ith your email address
  // this method are accessible using HTTP GET at http://SERVER:PORT/email/test...

  /**
   * You can use the code below to test, whether sending emails is working at all
   * Replace MY_EMAIL_ADDRESS ith your email address
   * This method are accessible using HTTP GET at http://SERVER:PORT/email/test...
   * DO NOT enable this function in production!
   */
  // @Get('test')
  // async testEmail() {
  //   logger.log('EmailController.testEmail - start');
  //   this.emailService.sendEmail('test@dcs-fuerth.de', 'superSecret42');
  //   logger.log(`EmailController.testEmail - done`);
  // }
}
