/**
 * This file contains the [[AuthModule]] which provides the [[AuthController]] and [[UserDataService]] to other modules.
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserDataService } from './user-data.service';
import { UserModule } from '../../user/user.module';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserDataService],
  exports: [UserDataService],
})
export class AuthModule {}
