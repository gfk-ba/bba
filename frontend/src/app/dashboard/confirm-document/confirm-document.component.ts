import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_ENVIRONMENT, IEnvironment } from '@dcs/ngx-tools';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Document } from '../../reducers/document/models/document.class';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ChangeDetectorRef,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

type CouponStatus = 'valid' | 'invalid' | 'untested';

@Component({
  selector: 'dcs-confirm-document',
  templateUrl: './confirm-document.component.html',
  styleUrls: ['./confirm-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDocumentComponent implements OnChanges {
  @Input()
  public document: Document;

  @Input()
  public visible = false;

  @Output()
  public paymentSuccessful = new EventEmitter<any>();

  public couponStatus: CouponStatus = 'untested';

  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    @Inject(APP_ENVIRONMENT) private env: IEnvironment
  ) {
    this.form = fb.group({
      coupon: ['', [Validators.required]],
    });
  }

  public ngOnChanges() {
    if (this.visible) {
      this.setupPaypal();
    }
  }

  public validateCoupon(): void {
    const coupon: string = this.form.value.coupon;
    this.http
      .get(`${this.env.apiUrl}/coupons/${coupon}`, { responseType: 'text' })
      .pipe(
        catchError(() => {
          return of('invalid');
        })
      )
      .subscribe((data: string) => {
        this.couponStatus = data === 'OK' ? 'valid' : 'invalid';
        this.cd.markForCheck();

        if (this.couponStatus === 'valid') {
          this.reset();
          this.paymentSuccessful.next({ coupon });
        }
      });
  }

  private reset(): void {
    this.form.reset();
    this.couponStatus = 'untested';
  }

  private setupPaypal() {
    paypal.Button.render(
      {
        // Set your environment

        env: 'sandbox', // sandbox | production
        // Specify the style of the button

        style: { layout: 'vertical', size: 'medium', shape: 'rect', color: 'gold' },
        // horizontal | vertical // medium | large | responsive // pill | rect // gold | blue | silver | black
        // Specify allowed and disallowed funding sources
        //
        // Options:
        // - paypal.FUNDING.CARD
        // - paypal.FUNDING.CREDIT
        // - paypal.FUNDING.ELV

        funding: { allowed: [paypal.FUNDING.CARD], disallowed: [paypal.FUNDING.CREDIT] },
        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

        client: {
          sandbox:
            'AUogdoy0tztATTKpaSDoTpPbl33y3j1ttp84mHy0PAIXh5UeZppm6Ish6gzX7XEK5ywP_ukFFhQ-Bd9O',
          production: '<insert production client id>',
        },
        payment: function(_data: any, actions: any) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: '1.00', currency: 'EUR' },
                },
              ],
            },
          });
        },
        onAuthorize: (_data: any, actions: any) => {
          return actions.payment.execute().then((result: any) => {
            this.paymentSuccessful.next({ paypal: result });
          });

          // Example success response
          // const resp = {
          //   id: 'PAY-0WX04483GR9639255LOSL3EI',
          //   intent: 'sale',
          //   state: 'approved',
          //   cart: '6FA78742GD426071A',
          //   create_time: '2018-09-21T09:45:32Z',
          //   payer: {
          //     payment_method: 'paypal',
          //     status: 'VERIFIED',
          //     payer_info: {
          //       email: 'somebody@some-domain.com',
          //       first_name: 'test',
          //       middle_name: 'test',
          //       last_name: 'buyer',
          //       payer_id: '8629FGNH6Y8X6',
          //       country_code: 'DE',
          //       shipping_address: {
          //         recipient_name: 'test buyer',
          //         line1: 'ESpachstr. 1',
          //         city: 'Freiburg',
          //         state: 'Empty',
          //         postal_code: '79111',
          //         country_code: 'DE',
          //       },
          //     },
          //   },
          //   transactions: [
          //     {
          //       amount: { total: '0.01', currency: 'USD', details: {} },
          //       item_list: {},
          //       related_resources: [
          //         {
          //           sale: {
          //             id: '4HW43255PE5672725',
          //             state: 'pending',
          //             payment_mode: 'INSTANT_TRANSFER',
          //             protection_eligibility: 'ELIGIBLE',
          //             parent_payment: 'PAY-0WX04483GR9639255LOSL3EI',
          //             create_time: '2018-09-21T09:45:32Z',
          //             update_time: '2018-09-21T09:45:32Z',
          //             reason_code: 'RECEIVING_PREFERENCE_MANDATES_MANUAL_ACTION',
          //             amount: { total: '0.01', currency: 'USD', details: { subtotal: '0.01' } },
          //           },
          //         },
          //       ],
          //     },
          //   ],
          // };
        },
      },
      '#paypal-button-container'
    );
  }
}
