/**
 * This file contains the [[UserModule]] which provides the [[UserService]] and [[UserController]] to other modules.
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

/**
 * The UserModule providess the [[UserService]] and [[UserController]] to other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
