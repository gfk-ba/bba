/**
 * This file contains the [[LinkModule]] which provides the [[LinkService]] to other modules
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../shared/auth/auth.module';
import { Link } from './link.entity';
import { LinkService } from './link.service';

/**
 * This module provides the [[LinkService]] to other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Link]), AuthModule],
  providers: [LinkService],
  controllers: [],
  exports: [LinkService],
})
export class LinkModule {}
