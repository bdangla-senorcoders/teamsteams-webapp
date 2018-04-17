import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {
	addPlayer:FormGroup;
  constructor(private fb: FormBuilder) {
  }
  createPlayer(){
  	console.log(this.addPlayer.value)
  }
  ngOnInit() {
  	this.addPlayer=this.fb.group({
  		username:['', Validators.required],
  		firstname:['', Validators.required],
  		lastname:['', Validators.required],
  		birthdate:['', Validators.required],
  		email:['', [Validators.required, Validators.email]],
  		password:['', [Validators.required, Validators.minLength(6)]],
  		// birthday:['', Validators.required],
  		gender:['', Validators.required],
  		position:['', Validators.required],
  		yerseyNumber:['', Validators.required],
  		contacts:['', Validators.required],
  	});
  }

}
