import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MainNavigationComponent } from './main-navigation.component';
import { configureComponentTestSuite } from '../../../testing';

describe('MainNavigationComponent', () => {
  configureComponentTestSuite();

  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainNavigationComponent],
      imports: [StoreModule.forRoot({}), CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
