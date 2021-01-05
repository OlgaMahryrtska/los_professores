import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {UserComponent} from './user/user.component';


import { BoardAdminComponent } from './board-admin/board-admin.component';
import {CitiesListComponent} from './cities-list/cities-list.component';
import{PrivatePolicyComponent}from './footer/private-policy/private-policy.component';
import{PrivateCookiesComponent} from './footer/private-cookies/private-cookies.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'cities', component: CitiesListComponent},

  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'users', component: UserComponent},
  {path: 'private-policy', component:PrivatePolicyComponent},
  {path: 'private-cookies', component:PrivateCookiesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
