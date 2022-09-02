import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';
import { DeleteUserComponent } from '../../dialogs/delete-user/delete-user.component';
import { EditUserComponent } from '../../dialogs/edit-user/edit-user.component';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [MessageService]
})
export class CreateUserComponent implements OnInit {

  titleDialogUser = '';
  user_firstName ='';
  user_email = '';
  user_password = '';
  user_id: any = '';
  user_update:any = '';

  users: any[] =[];

  submitted =false;
  userDialog = false

  virtualUser = [];

  cols: any[]= [];

  constructor(private users_services: AdminUserService, private messageService: MessageService,
    private dialog: MatDialog,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllUser(); 
    this.cols = [
      { field: 'firstName', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
      { field: 'action', header: 'Action' }
  ];
  this.virtualUser = Array.from({length: 10000});
  }

  getAllUser() {
    this.users_services.getAllUsers().subscribe(res => {
      console.log(res.users);
      this.users = res.users;
    })
  }

  openNewUser(){
    this.titleDialogUser = 'Create User';
    this.user_firstName ='';
    this.user_email = '';
    this.user_password = '';
    this.userDialog = true;
  }

  openUpdateUser(user: any){
    this.user_update =user;
this.user_id = user.id
    this.user_firstName = user.firstName;
    this.user_email = user.email;
    this.user_password= user.password;

    
    this.titleDialogUser = 'Update User';
    this.userDialog = true;
  }
  
  deleteUser(user: any){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(user);
        
        if (user.is_new_user) {
          this.users = this.users.filter(val => val.id !== user.id);
         
        }else {
          this.users_services.deleteUser({id: user.id}).subscribe(res => {
            console.log(res);
            
            this.users = this.users.filter(val => val.id !== user.id);
          })
      }
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
      }
  });
 }

 hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

submittedUser() {
  this.submitted = true;
  if (this.titleDialogUser == 'Create User') {
    this.createNewUser();
  } else {
    this.updateUser();
  }
}

createNewUser(){
  let query = {
    body: (
      {
        firstName:  this.user_firstName,
        email: this.user_email,
        password: this.user_password
      })
 }

 this.users_services.addUser(query).subscribe(res => {
 
 res.is_new_user = true;
 console.log(res);
 this.users = [...this.users, res]
 this.users = this.users.reverse();
  // this.users.unshift(res);
  console.log(this.users);
  this.userDialog = false;
  
 })
}

updateUser(){
  let query = {
    id: this.user_id,
    body: (
      {
        firstName:  this.user_firstName,
        email: this.user_email,
        password: this.user_password
      })
  }

  if (this.user_update.is_new_user) {
    let new_array = this.users.map((user: any) => {
      if (user.id == this.user_update.id) {
        user.firstName = this.user_firstName;
        user.email =this.user_email;
        user.password = this.user_password;
        return user;
      }
    })
  }else {
    
  this.users_services.updateUser(query).subscribe(res => {
    console.log(res);

    let new_array = this.users.map((user: any) => {
      if (user.id == res.id) {
        user.firstName = res.firstName;
        user.email =res.email;
        user.password = res.password;
        return user;
      }
    })

  })
  }

  this.userDialog = false;
}


}
