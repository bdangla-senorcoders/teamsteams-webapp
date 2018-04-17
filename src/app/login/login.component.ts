import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs/Rx";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	cookieValue:string;
  constructor(private fb:FormBuilder,private http: HttpClient, private auth:AuthenticationService,private cookieService: CookieService, private router:Router,private toastr: ToastrService) { }

  login(){
  	// console.log(this.loginForm.value)
  	this.auth.login(this.loginForm.value).subscribe(
			data=>{
				//it the credentials are correct. create a cookie with the user data
				//this.cookieService.set( 'sessionToken', data['token'] );
				//return true;
				//console.log(data);
				if (data['message']) {
					this.showError(data['message'])
				}
				else{
					let dataString=JSON.stringify(data)
					this.cookieService.set( 'sessionToken', dataString );
					window.location.reload();
					//this.router.navigate(["/"])
				}
			},
			error=>{
				console.error(error);
				this.showError(error);
				
			}
		);
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  ngOnInit() {
  	this.loginForm=this.fb.group({
  		username:['', Validators.required],
  		password:['', Validators.required],
  	})
  	if(this.auth.isLogged()){
  		this.router.navigate(["/"])
  	}
  }

}
