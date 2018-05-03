import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
const  API_ENDPOINT="http://138.68.19.227:8187/";
@Injectable()
export class TeamService {
  token:string;
  id:string;
  httpOptions:any;
  teamId:string;
  constructor(private http:HttpClient, private cookieService: CookieService) {this.getToken() }
  getToken(){
    let data=this.cookieService.get('sessionToken');
    if (data) {
      let json= JSON.parse(data);
      this.token= json['token'];
      this.id=json['id'];
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token':`${this.token}` })
      };
    } 
  }
  getTeams(){
     return this.http.get(`${API_ENDPOINT}teams/`,this.httpOptions)
  }
  createUser(user){
    let body = JSON.stringify(user);
    return this.http.post(`${API_ENDPOINT}user/player/`,body, this.httpOptions )
  }
  createPlayer(player){
    let body = JSON.stringify(player);
    //return body
    return this.http.post(`${API_ENDPOINT}players/`,body, this.httpOptions )
  }
  uploadImage(image){
    let body = JSON.stringify(image);
    return this.http.post(`${API_ENDPOINT}images/users`,body, this.httpOptions )
  }
  getTeamsByUser(type,id){
    type=type.toLowerCase();
    return this.http.get(`${API_ENDPOINT}teams/${type}/${id}`,this.httpOptions)
  }
  editUser(id,data){
    let body = JSON.stringify(data);
    return this.http.put(`${API_ENDPOINT}user/${id}`,body, this.httpOptions )
  }
 //  searchTeam(teamName){
	// return this.http.get(`${API_ENDPOINT}?name=%${teamName}%`);
 //  }
 //  createTeam(team){
 //  	let body = JSON.stringify(team);
 //    return this.http.post(API_ENDPOINT, body, httpOptions);
 //  }
}
