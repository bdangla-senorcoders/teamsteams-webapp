import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const  API_ENDPOINT="/teams";
@Injectable()
export class TeamService {

  constructor(private http:HttpClient) { }
  getTeams(){
  	return this.http.get(API_ENDPOINT);
  }
  searchTeam(teamName){
	return this.http.get(`${API_ENDPOINT}?name=%${teamName}%`);
  }
  createTeam(team){
  	let body = JSON.stringify(team);
    return this.http.post(API_ENDPOINT, body, httpOptions);
  }
}
