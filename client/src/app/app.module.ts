import { BrowserModule } from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';


import{HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './_helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { CitiesListComponent } from './cities-list/cities-list.component';
import { UserComponent } from './user/user.component';
import { FooterComponent } from './footer/footer.component';
import { PrivatePolicyComponent } from './footer/private-policy/private-policy.component';
import { PrivateCookiesComponent } from './footer/private-cookies/private-cookies.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    CitiesListComponent,
    UserComponent,
    FooterComponent,
    PrivatePolicyComponent,
    PrivateCookiesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   NgbModule,

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
