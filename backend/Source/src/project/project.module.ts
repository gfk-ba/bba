/**
 * This file contains the [[ProjectModule]] which provides the [[ProjectService]] and [[ProjectController]] to other modules.
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.entity';
import { AuthModule } from '../shared/auth/auth.module';
import { UserDataService } from '../shared/auth/user-data.service';

/**
 * This module provides the [[ProjectService]] and [[ProjectController]] to other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Project]), AuthModule, UserDataService],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
