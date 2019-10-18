import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiRequestActionTypes } from '@dcs/ngx-tools';
import { Store, StoreModule } from '@ngrx/store';
import { RegisterPageComponent } from './register-page.component';
import { UserRequest } from '../../reducers/user/types';
import { UserCreate } from '../../reducers/user/user.actions';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('creates a FormGroup', () => {
      expect(component.form).toEqual(expect.any(FormGroup));
    });

    it('validates', () => {
      expect(component.form.valid).toBeFalsy();

      component.form.setValue({
        email: 'test@example.com',
        password: 'secret',
        passwordConfirmation: 'secret',
      });
      expect(component.form.valid).toBeTruthy();

      component.form.setValue({
        email: 'test@example.com',
        password: 'secret',
        passwordConfirmation: 'no secret',
      });
      expect(component.form.valid).toBeFalsy();

      component.form.setValue({
        email: 'test',
        password: 'secret',
        passwordConfirmation: 'secret',
      });
      expect(component.form.valid).toBeFalsy();

      component.form.setValue({
        email: '',
        password: '',
        passwordConfirmation: '',
      });
      expect(component.form.valid).toBeFalsy();
    });
  });

  describe('submit', () => {
    let dispatchSpy: jest.SpyInstance;
    let store: Store<any>;
    const user: UserRequest = {
      email: 'test@example.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    };

    beforeEach(() => {
      store = TestBed.get(Store);
      dispatchSpy = jest.spyOn(store, 'dispatch');
      component.form.setValue(user);

      component.submit();
    });

    afterEach(() => {
      dispatchSpy.mockRestore();
    });

    it('dispatches the an action', () => {
      expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });

    it('dispatches the correct action', () => {
      const action: UserCreate = dispatchSpy.mock.calls[0][0];

      expect(action.type).toEqual(ApiRequestActionTypes.ExecuteApiRequest);
      expect(action.payload.handlers).toEqual('[User] Create');
      expect(action.payload.request.url).toEqual('users');
      expect(action.payload.request.options.body).toEqual(user);
    });
  });
});
