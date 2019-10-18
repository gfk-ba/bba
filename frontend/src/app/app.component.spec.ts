import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { configureComponentTestSuite } from '../testing';

describe('AppComponent', () => {
  configureComponentTestSuite();

  let fixture: ComponentFixture<AppComponent>;

  beforeAll(async () => {
    // remove console.log from test output
    jest.spyOn(global.console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the footer', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer').textContent).toContain('2018');
  });
});
