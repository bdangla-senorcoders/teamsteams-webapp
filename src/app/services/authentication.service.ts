import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const  API_ENDPOINT="http://138.68.19.227:8187/login";
@Injectable()
export class AuthenticationService {
	constructor(private http:HttpClient, private cookieService: CookieService) { }
	login(login){
	  	let body = JSON.stringify(login);
	    return this.http.post(API_ENDPOINT, body, httpOptions);
	}
	isLogged(){
		console.log(JSON.parse(this.cookieService.get('sessionToken')))
		return this.cookieService.check('sessionToken');
	}
	logOut(){
		this.cookieService.delete('sessionToken');
	}
	userLogged(){
		let data=this.cookieService.get('sessionToken');
		if (data) {
			return JSON.parse(data);
		} 
		else{
			return false;
		}
	}
}
