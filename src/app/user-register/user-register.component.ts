import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TeamService} from "../services/team.service";
import {Observable} from "rxjs/Rx";


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
	showCreateTeam:boolean =false;
	showJoinTeam: boolean= false;
	showSearchResult:boolean=false;
	public sports: Array<any>;
	public teamList:any;
	public search:string;
	public team:any={};

  constructor(private teamService:TeamService) { }
	userSelection(deviceValue) {
	    if (deviceValue=="create") {
	    	this.showCreateTeam=true;
	    	this.showJoinTeam=false;
	    }
	    else if(deviceValue=="join"){
	    	this.showJoinTeam=true;
	    	this.showCreateTeam=false;
	    }
	}
	sportSelection(sport){
		this.team.sport=sport.value;
	}
	getTeams(){
		this.teamService.getTeams().subscribe(
			data=>{this.teamList=data},
			err=>console.error(err),
			()=>console.log('ok')
		)
	}
	searchTeam(){
		this.teamService.searchTeam(this.search).subscribe(
			data=>{this.teamList=data},
			err=>console.error(err),
			()=>{
					console.log('search ok');
					this.showSearchResult=true;
				}
		)
	}
	createTeam(){
		this.teamService.createTeam(this.team).subscribe(
			data=>{
				this.getTeams();
				return true;
			},
			error=>{
				console.error("error saving food!");
				return Observable.throw(error);
				
			}
		);
	}
  ngOnInit() {
  	this.getTeams();
  	this.sports=[
		{
			id: 'default',
	        default: true,
	        text: 'choose one'
		},
		{
			id:'soccer',
			text:'soccer'
		},
		{
			id:'futball',
			text:'futball'
		},
		{
			id:'voleyball',
			text:'voleyball'
		},
		{
			id:'baseball',
			text:'baseball'
		}

		];
  }

}
