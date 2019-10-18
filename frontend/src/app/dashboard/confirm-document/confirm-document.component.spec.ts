import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { ConfirmDocumentComponent } from './confirm-document.component';

describe('ConfirmDocumentComponent', () => {
  let component: ConfirmDocumentComponent;
  let fixture: ComponentFixture<ConfirmDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDocumentComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: APP_ENVIRONMENT, useValue: { apiUrl: 'http://localhost:3000' } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('reset', () => {
    beforeEach(() => {
      component.form.setValue({ coupon: 'any coupon' });
      component.couponStatus = 'valid';
    });

    it('resets data', () => {
      (component as any).reset();

      expect(component.form.value).toMatchSnapshot();
      expect(component.couponStatus).toEqual('untested');
    });
  });

  describe('validateCoupon', () => {
    let httpMock: HttpTestingController;
    let paymentSuccessfulSpy: jest.SpyInstance;
    let resetSpy: jest.SpyInstance;

    beforeEach(() => {
      httpMock = TestBed.get(HttpTestingController);
      paymentSuccessfulSpy = jest.spyOn(component.paymentSuccessful, 'next');
      resetSpy = jest.spyOn(component as any, 'reset');
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('component has an initial couponStatus of untexted', () => {
      expect(component.couponStatus).toEqual('untested');
    });

    describe('for a valid coupon', () => {
      beforeEach(() => {
        component.form.setValue({ coupon: 'test-coupon' });
        component.validateCoupon();

        const req = httpMock.expectOne('http://localhost:3000/coupons/test-coupon');
        req.flush('OK');
      });

      it('emits on paymentSuccessful', () => {
        expect(paymentSuccessfulSpy).toHaveBeenCalledWith({ coupon: 'test-coupon' });
      });

      it('resets component data', () => {
        expect(resetSpy).toHaveBeenCalled();
      });
    });

    describe('for an invalid coupon', () => {
      beforeEach(() => {
        component.form.setValue({ coupon: 'test-coupon' });
        component.validateCoupon();

        const req = httpMock.expectOne('http://localhost:3000/coupons/test-coupon');
        req.flush('ARGH', { status: 422, statusText: 'nope' });
      });

      it('does not emit on paymentSuccessful', () => {
        expect(paymentSuccessfulSpy).not.toHaveBeenCalled();
      });

      it('sets couponStatus to invalid', () => {
        expect(component.couponStatus).toEqual('invalid');
      });
    });
  });
});
