import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSectionComponent } from './admin-section/admin-section.component';
import { UserSectionComponent } from './user-section/user-section.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
   
    component: AdminSectionComponent,
  },
  {
    path: 'user',
    
    component: UserSectionComponent,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
