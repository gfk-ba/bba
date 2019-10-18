/**
 * The app module - the first module loaded (from main.ts)
 */

/**
 * get import all other modules and the nestj stuff
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { CouponModule } from './coupon/coupon.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './shared/auth/auth.module';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ContractModule } from './contract/contract.module';

/**
 * This is the first module, that will be created. Loads all other modules and configures the middleware.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    CouponModule,
    ProjectModule,
    ContractModule,
    DocumentModule,
    UserModule,
    EmailModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  /**
   * We configure the middleware to call our own logger function for every call to the backend
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('/');
  }
}

/**
 * the logger function we inject as a middleware.
 * Will be called for every request.
 * If you want to log to a different system (e.g. GreyLog), then this is the place to do this.
 * @param req the request which triggered the call
 * @param _res the response object of the call (we don't need that, but mandatory)
 * @param next the function to call when we're done and the next middleware should be called
 */
export function logger(req, _res, next) {
  console.log(`Processing ${req.method} request ${req.url}`);
  next();
}
