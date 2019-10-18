import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RecoveryPageComponent } from './recovery-page/recovery-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginPageComponent, RegisterPageComponent, RecoveryPageComponent],
})
export class UserModule {}
