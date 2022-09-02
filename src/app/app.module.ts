import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CreateUserComponent } from './admin-section/components/create-user/create-user.component';
import { PostUsersComponent } from './_shared/components/post-users/post-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { NewUserComponent } from './admin-section/dialogs/new-user/new-user.component';
import { EditUserComponent } from './admin-section/dialogs/edit-user/edit-user.component';
import { DeleteUserComponent } from './admin-section/dialogs/delete-user/delete-user.component';
import { ConfirmationService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AdminSectionComponent,
    UserSectionComponent,
    CreateUserComponent,
    PostUsersComponent,
    NewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    InputTextareaModule,
    CardModule,
    ButtonModule,
    RippleModule,
     BrowserAnimationsModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    VirtualScrollerModule,
    ScrollingModule,
    MatDialogModule,
    ConfirmDialogModule,
    DialogModule,
    InputNumberModule,
    InputTextModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
