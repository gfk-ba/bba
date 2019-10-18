/**
 * This file contains the [[PaymentModule]] which provides the [[PaymentService]] to other modules.
 */

/**
 * Importing stuff from NestJS and our own code.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { AuthModule } from '../shared/auth/auth.module';
import { CouponModule } from '../coupon/coupon.module';

/**
 * This module provides the [[PaymentService]] to other modules.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Payment]), AuthModule, CouponModule],
  providers: [PaymentService],
  controllers: [],
  exports: [PaymentService],
})
export class PaymentModule {}
