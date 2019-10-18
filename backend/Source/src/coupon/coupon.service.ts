/**
 * Contains the [[CouponService]]
 */

/**
 * Import NestJS and TypeORM stuff
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import * as logger from '../shared/logger';

/**
 * The main purpose of this service is to provide functions to validate ([[validate]]) and mark coupons as used ([[use]]).
 */
@Injectable()
export class CouponService {
  /**
   * Use dependency injection to get access to the [[couponRepository]]
   * @param couponRepository the repository for the coupon entity. The repository contains methods to interact with the database table coupons
   */
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  /**
   * An async function to validate a coupon code.
   * @param couponCode The coupon code which should be validated.
   * @returns true if the coupon is still valid, false if not.
   */
  async validate(couponCode: string): Promise<boolean> {
    const coupon = await this.findUnusedCoupon(couponCode);

    logger.log(
      `CouponService.validate - coupon with code ${couponCode}`,
      coupon,
    );

    return !!coupon;
  }

  /**
   * This async function tries to mark a coupon as used. This can fail if the coupon doesn't exist or is already marked as used.
   * @param couponCode The code of the coupon which should be marked as used. (see coupons.code in the database)
   * @returns true, if the coupon was successfully marked as used, false if not.
   */
  async use(couponCode: string): Promise<boolean> {
    let result = false;
    const coupon = await this.findUnusedCoupon(couponCode);

    if (coupon) {
      await this.couponRepository.update(coupon.id, { usedAt: new Date() });
      result = true;
    } else {
      logger.log(
        `CouponService.use - ERROR - no unused coupon with code ${couponCode} was found`,
      );
    }

    return result;
  }

  // --------------------------------------------------------------------------------------

  /**
   * This private async helper function tries to find an unused coupon with the given code.
   * This can fail if the coupon doesn't exist or is already marked as used.
   * @param couponCode The code if the coupon we're looking for.
   * @returns the coupon (if found) or null.
   */
  private async findUnusedCoupon(couponCode: string) {
    const coupon = await this.couponRepository.findOne({
      code: couponCode,
      usedAt: null,
    });

    logger.log(
      `CouponService.findUnusedCoupon - unused coupon with code ${couponCode} found?`,
      !!coupon,
    );

    return coupon;
  }
}
