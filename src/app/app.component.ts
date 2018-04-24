import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { HostListener, Inject } from "@angular/core";
import {AuthenticationService} from './services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isCollapsed=true;
  isLogged;
  isManager:boolean=false;
  perfilImage:string;
  constructor(private auth:AuthenticationService,private toastr: ToastrService, private router:Router){
    this.isLoggedFunction();
    if (this.isLogged) {
      this.getUserInfo()
    }
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
    this.isManager=false
    this.logOutSuccess()
    if(!this.auth.isLogged()){
      this.router.navigate(["/"])
    }
    this.perfilImage="";
  }
  getUserInfo(){
   let data=this.auth.userLogged();
   let ramdon = new Date().getTime();
   if (data.role.name=="Manager") {
    this.isManager=true
   }
   else{
     this.isManager=false
   }
   this.perfilImage=`http://138.68.19.227:8187/images/${ramdon}/users&thumbnail/${data.id}`
  }
  logOutSuccess() {
    this.toastr.success('Success', 'LogOut Correct',{positionClass:"toast-top-center"});
  }
}
