import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../services/team.service';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
	addPlayer:FormGroup;
  teams:any;
  constructor(private fb: FormBuilder,private teamservice: TeamService) {
  }
  createPlayer(){
    let player={
      'team':this.addPlayer.get('team').value,
      'birthDay':this.addPlayer.get('birthDay').value,
      'yerseyNumber':this.addPlayer.get('yerseyNumber').value,
      'gender':this.addPlayer.get('gender').value,
      'nonPlayer':this.addPlayer.get('nonPlayer').value,
      'managerAccess':this.addPlayer.get('managerAccess').value,
      'positions':this.addPlayer.get('positions').value
    }
    let user={
      "username":this.addPlayer.get('username').value, 
      "firstName":this.addPlayer.get('firstname').value, 
      "lastName":this.addPlayer.get('lastname').value, 
      "password":this.addPlayer.get('password').value,
      "email":this.addPlayer.get('email').value
    }
  	console.log(player)
    console.log(user)

  }
  ngOnInit() {
  	this.addPlayer=this.fb.group({
  		username:['', Validators.required],
  		firstname:['', Validators.required],
  		lastname:['', Validators.required],
  		birthDay:['', Validators.required],
  		email:['', [Validators.required, Validators.email]],
  		password:['', [Validators.required, Validators.minLength(6)]],
  		gender:['', Validators.required],
  		positions:['', Validators.required],
  		yerseyNumber:['', Validators.required],
  		contacts:['', Validators.required],
      nonPlayer:['', Validators.required],
      managerAccess:['', Validators.required],
      team:['', Validators.required],
  	});
    this.getTeams()
  }
  getTeams(){
    this.teamservice.getTeams().subscribe(
      data=>{
        this.teams=data;
      },
      error=>{
        console.log(error)
      }
    )
  }

}
