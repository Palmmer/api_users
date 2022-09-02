import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/_shared/services/admin-user.service';
import { SignUpComponent } from '../components/sign-up/sign-up.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password= '';

  users: any[] =[
    {
      email: 'admin@mail.com',
      password: 'admin',
    },
  ]

  constructor(private router: Router,private dialog: MatDialog, private users_services: AdminUserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.users_services.getAllUsers().subscribe(res => {
      console.log(res.users);
      this.users = res.users;
    })
  }

 
  openSignUp() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      height: '30rem',
      width: '24rem',
      data:this.users
    });
    dialogRef.afterClosed().subscribe((res: any) => {
    this.users = res;
    console.log(this.users);
    
    });
  }

  isLogin(){
    if (this.email == 'admin@mail.com') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['user']);
    }
  }

  // 9uQFF1Lh  atuny0@sohu.com

}
