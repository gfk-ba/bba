/**
 * This files contains the CouponController
 */

/**
 * import all the stuff we need from NestJS
 */
import {
  Controller,
  Param,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';

import { CouponService } from './coupon.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDataService } from '../shared/auth/user-data.service';
import * as logger from '../shared/logger';

/**
 * The CouponController provides a method [[validateCoupon]] to validate coupon codes.
 * All methods are accessible at /coupons
 */
@Controller('coupons')
export class CouponController {
  /**
   * Use dependency injection to get access to the CouponService and the UserDataService
   */
  constructor(
    private readonly couponService: CouponService,
    private readonly userDataService: UserDataService,
  ) {}

  /**
   * This async method is called using a GET call at /coupons/42 (if the coupon 42 should be validated).
   * This method needs a valid (JWT-)Bearer-Token in the http-header "Authorization"
   * Validates a coupon code
   * ```bash
   *   curl -X GET \
   *     http://SERVER:PORT/coupons/42 \
   *     -H 'Authorization: Bearer XXXXXXXXXXXX' \
   *     -H 'Cache-Control: no-cache'
   * ```
   * This route is restricted by [[AuthGuard]]
   * @param idCoupon the coupon code to validate (see column code in the database table coupon)
   * @param requestData the request data - we need this to get access to JWT
   * @returns http status 200 and "OK" if the coupon was valid\
   *          http status 401 if the JWT is missing\
   *          http status 417 if auth has valid (no valid login)\
   *          http status 422 if the couon is unknows/invalid
   */
  @Get(':idCoupon')
  @UseGuards(AuthGuard())
  async validateCoupon(@Param('idCoupon') idCoupon, @Req() requestData) {
    logger.log(`CouponController.useCoupon(${idCoupon})`);

    const userId = this.userDataService.getUserData(requestData);
    if (!userId) {
      logger.log(
        `CouponController.validateCoupon(${idCoupon}) - FEHLER: Keine userId`,
      );
      throw new HttpException(
        'userId missing in CouponController.validateCoupon',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const isValid = await this.couponService.validate(idCoupon);
    if (!isValid) {
      logger.log(
        `CouponController.useCoupon(${idCoupon}) - FEHLER: Coupon unbekannt oder verbraucht`,
      );
      throw new HttpException(
        `Unknown coupon code ${idCoupon}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return 'OK';
  }
}
