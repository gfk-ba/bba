/**
 * This file contains the [[DocumentModule]] which provides the [[DocumentService]] and [[DocumentController]] to other modules
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Document } from './document.entity';
import { PaymentModule } from '../payment/payment.module';
import { ContractModule } from '../contract/contract.module';
import { AuthModule } from '../shared/auth/auth.module';
import { ProjectModule } from '../project/project.module';
import { LinkModule } from '../link/link.module';

/**
 * This module provides the [[DocumentService]] and [[DocumentController]] to other modules
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    AuthModule,
    ProjectModule,
    LinkModule,
    AuthModule,
    PaymentModule,
    ContractModule,
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
