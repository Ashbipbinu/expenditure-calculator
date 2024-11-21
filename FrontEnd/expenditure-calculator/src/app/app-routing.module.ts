import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { AddExpenditureComponent } from './Components/add-expenditure/add-expenditure.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent ,
  },
  {
    path: 'signup',
    component: SignupComponent 
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent 
      },
      {
        path: 'dashboard',
        component: DashboardComponent 
      },
      {
        path: 'add-expense',
        component: AddExpenditureComponent
      }
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
