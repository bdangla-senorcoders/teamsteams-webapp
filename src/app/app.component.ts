import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HostListener, Inject } from "@angular/core";
import {AuthenticationService} from './services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isCollapsed=true;
  isLogged;
  constructor(private auth:AuthenticationService,private toastr: ToastrService){
    this.isLoggedFunction();
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 200) {
      this.addClass();
    } 
    else{
        this.removeClass();
    }

  }
  public addClass(){
  	let element = document.getElementById("menu-container");
    element.classList.add("menu-scroll");
  }
  public removeClass(){
  	let element = document.getElementById("menu-container");
    element.classList.remove("menu-scroll");
  }
  public isLoggedFunction(){
    this.isLogged=this.auth.isLogged();
  }
  public logOut(){
    this.auth.logOut();
    this.isLogged=false;
    this.logOutSuccess()
  }
  logOutSuccess() {
    this.toastr.success('Success', 'LogOut Correct',{positionClass:"toast-top-center"});
  }
}
