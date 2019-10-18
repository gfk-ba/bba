/**
 * This file contains the [[EmailModule]] which provides the [[EmailService]] and [[EmailController]] to other modules
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { UserModule } from '../user/user.module';

/**
 * This module provides the [[EmailService]] and [[EmailController]] to other modules
 */
@Module({
  imports: [UserModule],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [],
})
export class EmailModule {}
