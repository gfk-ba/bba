import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { RecoveryPageComponent } from './recovery-page.component';

describe('RecoveryPageComponent', () => {
  let component: RecoveryPageComponent;
  let fixture: ComponentFixture<RecoveryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryPageComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: APP_ENVIRONMENT, useValue: { apiUrl: '//localhost:3001' } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
