/**
 * contains the [[ContractModule]] which provides the [[ContractService]] to other modules
 */

/**
 * Importing stuff from NestJS and the [[ContractService]]
 */
import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';

/**
 * This module provides the [[ContractService]] to other modules
 */
@Module({
  imports: [],
  providers: [ContractService],
  controllers: [],
  exports: [ContractService],
})
export class ContractModule {}
