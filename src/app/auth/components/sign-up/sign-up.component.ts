import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user_firstName ='';
  user_email = '';
  user_password = '';
  users: any[] =[]

  constructor(public dialogRef: MatDialogRef<SignUpComponent>,private users_services: AdminUserService, @Inject(MAT_DIALOG_DATA) public user: []) { }

  ngOnInit(): void {
this.users = this.user;

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
  
   this.users_services.addUser(query).subscribe((res) => {
    res.is_new_user = true;
    console.log(res);
   this.users = [...this.users, res]
    // this.users.unshift(res);
    console.log(this.users);
    this.close(this.users)
   })
  }

  close(users:any) {
    this.dialogRef.close(users);
  }

}
