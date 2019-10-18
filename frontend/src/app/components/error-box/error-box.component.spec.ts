import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorBoxComponent } from './error-box.component';
import { configureComponentTestSuite } from '../../../testing';

@Component({
  template: `<dcs-error-box [error]="error"></dcs-error-box>`,
})
class TestHostComponent {
  public error: { status: number; message: string };
}

describe('ErrorBoxComponent', () => {
  configureComponentTestSuite();

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorBoxComponent, TestHostComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  describe('testing the component instance', () => {
    let fixture: ComponentFixture<ErrorBoxComponent>;
    let comp: ErrorBoxComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(ErrorBoxComponent);
      comp = fixture.componentInstance;
    });

    it('can load instance', () => {
      expect(comp).toBeTruthy();
    });

    it('title defaults to: Error', () => {
      expect(comp.title).toEqual('Error');
    });
  });

  describe('testing the template output', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let comp: TestHostComponent;
    let errorEl: HTMLDivElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();

      comp = fixture.componentInstance;
      errorEl = fixture.nativeElement.querySelector('dcs-error-box');
    });

    it('renders the empty error box component', () => {
      expect(errorEl).toMatchSnapshot();
    });

    it('renders the error if present', () => {
      comp.error = { status: 403, message: 'Keep out!' } as any;
      fixture.detectChanges();

      expect(errorEl).toMatchSnapshot();
    });
  });
});
