import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapDemoPageComponent } from './bootstrap-demo-page.component';
import { configureComponentTestSuite } from '../../../testing';

describe('BootstrapDemoPageComponent', () => {
  configureComponentTestSuite();

  let component: BootstrapDemoPageComponent;
  let fixture: ComponentFixture<BootstrapDemoPageComponent>;
  let element: HTMLDivElement;

  beforeAll(async () => {
    TestBed.configureTestingModule({
      declarations: [BootstrapDemoPageComponent],
      imports: [NoopAnimationsModule, NgbDatepickerModule.forRoot(), NgbTabsetModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders the the tabs', () => {
    expect(element.querySelector('ngb-tabset ul')).toMatchSnapshot();
  });
});
