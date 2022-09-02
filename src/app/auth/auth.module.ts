import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { ButtonModule } from "primeng/button";
import {RippleModule} from 'primeng/ripple';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    RippleModule,
    MatDialogModule,FormsModule
  ]
})
export class AuthModule { }
