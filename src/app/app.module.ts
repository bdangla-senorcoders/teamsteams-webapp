import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NgSelect2Module } from 'ng-select2';
import {TeamService} from './services/team.service';
import {AuthenticationService} from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPlayerComponent } from './add-player/add-player.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
const appRoutes: Routes=[
  {path:'', component:HomepageComponent},
  {path:'home', component:HomepageComponent},
  {path:'add-player', component:AddPlayerComponent},
  {path:'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomepageComponent,
    AddPlayerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgSelect2Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TeamService,AuthenticationService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
