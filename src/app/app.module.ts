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

import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ContactPageComponent } from './contact-page/contact-page.component';
import {MyGuardService} from './services/my-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationBuilderComponent } from './registration-builder/registration-builder.component';
const appRoutes: Routes=[
  {path:'home', component:HomepageComponent},
  {path:'add-player', component:AddPlayerComponent, canActivate:[MyGuardService]},
  {path:'login', component:LoginComponent},
  {path:'contact', component:ContactPageComponent},
  {path:'perfil', component:UserProfileComponent},
  {path:'register', component:UserRegisterComponent},
  {path:'formBuilder',component:RegistrationBuilderComponent,canActivate:[MyGuardService]},
  {path:'', redirectTo:'home',pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    HomepageComponent,
    AddPlayerComponent,
    LoginComponent,
    ContactPageComponent,
    UserProfileComponent,
    RegistrationBuilderComponent,
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
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOeXnyQinWcJhCb5T26OmV7rmhLXktpe4'
    }),
  ],
  providers: [MyGuardService,TeamService,AuthenticationService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
