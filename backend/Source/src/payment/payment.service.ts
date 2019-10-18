/**
 * Contains the [[PaymentService]]
 */

/**
 * Import NestJS and our code
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponService } from '../coupon/coupon.service';
import { Payment } from './payment.entity';
import * as logger from '../shared/logger';

/**
 * The PaymentService provides functions to store payment by PayPal or coupon code.
 */
@Injectable()
export class PaymentService {
  /**
   * Use dependency injection to get access to the paymentRepository and the couponService.
   * @param paymentRepository The payment repository is our way to work with the underlaying database table payments.
   * @param couponService This service is used to invalidate a coupon code.
   */
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly couponService: CouponService,
  ) {}

  /**
   * This async function stores a coupon payment and invalidates the coupon code.
   * @param documentId The id of the document to which the payment belongs.
   * @param couponCode The code of the coupon used for the payment.
   * @returns The payment record from the database.
   */
  async storeCouponPayment(
    documentId: number,
    couponCode: string,
  ): Promise<Payment> {
    logger.log(
      `PaymentService.storeCouponPayment(${documentId}, ${couponCode})`,
    );

    if (!documentId) {
      throw new HttpException(
        'documentId missing in PaymentService.storeCouponPayment',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (!couponCode) {
      throw new HttpException(
        'couponCode missing in PaymentService.storeCouponPayment',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const couponPayment = new Payment();
    couponPayment.documentId = documentId;
    couponPayment.couponCode = couponCode;
    couponPayment.type = 'COUPON';
    couponPayment.createdAt = new Date();

    logger.log(
      'PaymentService.storeCouponPayment - couponPayment',
      couponPayment,
    );

    const result = await this.paymentRepository.save(couponPayment);
    logger.log('PaymentService.storeCouponPayment - savedPayment', result);

    await this.couponService.use(couponCode);
    logger.log(
      'PaymentService.storeCouponPayment - coupon was invalidated',
      couponCode,
    );

    return result;
  }

  /**
   * This async function stores a PayPal payment.
   * @param documentId The id of the document for which the payment is.
   * @param paypalReceipt The payment receipt from PayPal.
   * @returns The payment record from the database.
   */
  async storePayPalPayment(
    documentId: number,
    paypalReceipt: string,
  ): Promise<Payment> {
    logger.log('PaymentService.storePayPalPayment', documentId, paypalReceipt);

    if (!documentId) {
      throw new HttpException(
        'documentId missing in PaymentService.storePayPalPayment',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    if (!paypalReceipt) {
      throw new HttpException(
        'paypalReceipt missing in PaymentService.storePayPalPayment',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const paypalPayment = new Payment();
    paypalPayment.documentId = documentId;
    paypalPayment.paypalReceipt = paypalReceipt;
    paypalPayment.type = 'PAYPAL';
    paypalPayment.createdAt = new Date();

    logger.log(
      'PaymentService.storePayPalPayment - paypalPayment',
      paypalPayment,
    );

    const result = await this.paymentRepository.save(paypalPayment);
    logger.log('PaymentService.storePayPalPayment - savedPayment', result);

    return result;
  }
}
