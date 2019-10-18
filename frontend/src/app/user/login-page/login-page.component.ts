import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { LoginFetchTokenAction } from '../../reducers/login/login.actions';
import { errorSelector } from '../../reducers/login/login.selectors';

@Component({
  selector: 'dcs-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends StoreComponent implements OnInit {
  public form: FormGroup;
  public apiError: HttpErrorResponse | null;

  constructor(store: Store<State>, fb: FormBuilder, cd: ChangeDetectorRef) {
    super(store, cd);
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  ngOnInit() {
    this.subscribeToState(errorSelector, error => {
      this.apiError = error;
    });
  }

  public submitForm(): void {
    if (this.form.valid) {
      this.dispatch(new LoginFetchTokenAction(this.form.value));
    }
  }
}
