import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const  API_ENDPOINT="http://138.68.19.227:8187/";
@Injectable()
export class AuthenticationService {
	constructor(private http:HttpClient, private cookieService: CookieService) { }
	login(login){
	  	let body = JSON.stringify(login);
	    return this.http.post(`${API_ENDPOINT}login`, body, httpOptions);
	}
	isLogged(){
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
	changePassword(data){
		let body = JSON.stringify(data);
	    return this.http.post('http://138.68.19.227:8187/password/change', body, httpOptions);
	}
	updateCookie(old, newinfo){
		let data={
			"role":old.role,
			"username":newinfo.username,
			"firstName": newinfo.firstName,
    		"lastName": newinfo.lastName,
    		"email": newinfo.email,
    		"id": old.id,
    		"token": old.token
    	}
		let dataString=JSON.stringify(data);
		this.cookieService.delete('sessionToken');
		this.cookieService.set( 'sessionToken', dataString );
	}
	//check if email already exist
	checkEmail(email){
		return this.http.get(`${API_ENDPOINT}user/enable/${email}`, httpOptions)
	}
}
