/**
 * This file contains the [[CouponModule]] which provides the [[CouponService]] and [[CouponController]] to other modules
 */

/**
 * Importing stuff from NestJS
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { Coupon } from './coupon.entity';
import { AuthModule } from '../shared/auth/auth.module';

/**
 * This module provides the [[CouponService]] and [[CouponController]] to other modules
 */
@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), AuthModule],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
