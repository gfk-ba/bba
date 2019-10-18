import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { UserCreate } from '../../reducers/user/user.actions';

export function passwordsMatchValidator(fg: AbstractControl): any {
  return fg.value.password === fg.value.passwordConfirmation ? null : { passwordsMatch: false };
}

@Component({
  selector: 'dcs-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public form: FormGroup;

  constructor(fb: FormBuilder, private store: Store<State>) {
    this.form = fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordConfirmation: ['', [Validators.required]],
      },
      { validator: [passwordsMatchValidator] }
    );
  }

  public submit(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.form.valid) {
      this.store.dispatch(new UserCreate(this.form.value));
    }
  }
}
