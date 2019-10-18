import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { Environment } from '../../../environments/environment';

@Component({
  selector: 'dcs-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss'],
})
export class RecoveryPageComponent {
  public requestSent = false;
  public form: FormGroup;

  constructor(
    fb: FormBuilder,
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private env: Environment
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public sendRequest(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.form.valid) {
      this.http.post(`${this.env.apiUrl}/email/reset`, this.form.value).subscribe(() => {
        this.requestSent = true;
      });
    }
  }
}
