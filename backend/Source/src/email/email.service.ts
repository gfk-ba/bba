/**
 * Contains the [[EmailService]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable } from '@nestjs/common';
import * as logger from '../shared/logger';

/**
 * The EmailService provide a function to send an email with the resetted password using the sendGrid
 */
@Injectable()
export class EmailService {
  /**
   * This functions sends an email (text and html) to the user (specified by emailOfUser) with the changed password (specified by newPassword)
   * @param emailOfUser the email address to which we want to send the new password.
   * @param newPassword the fresh created password for the user with the given email address (emailOfUser).
   */
  public sendEmail(emailOfUser: string, newPassword: string) {
    logger.log('EmailService.sendEmail', emailOfUser);

    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: emailOfUser,
      from: process.env.SENDGRID_EMAIL_SENDER,
      subject: 'Password reset for BBA',
      text: `Your new password is ${newPassword}`,
      html: `Your new password is ${newPassword}`,
    };
    sgMail.send(msg);
  }
}
