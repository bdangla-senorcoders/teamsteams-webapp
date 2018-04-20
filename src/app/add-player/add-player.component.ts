import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../services/team.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {
	addPlayer:FormGroup;
  teams:any;
  htmlContent:string;
  @ViewChild('contacts') contacts:ElementRef;
  constructor(private fb: FormBuilder,private teamservice: TeamService,private toastr: ToastrService) {
  }
  createPlayer(){
    let user={
      "username":this.addPlayer.get('username').value, 
      "firstName":this.addPlayer.get('firstname').value, 
      "lastName":this.addPlayer.get('lastname').value, 
      "password":this.addPlayer.get('password').value,
      "email":this.addPlayer.get('email').value,
      "contacts":[{'name':this.addPlayer.get('contacts_name').value, 'info':this.addPlayer.get('contacts_val').value, 'type':this.addPlayer.get('contacts_type').value}]
    }
    this.teamservice.createUser(user).subscribe(
      data=>{
        let id=data['id'];
        let player={
          'user':id,
          'team':this.addPlayer.get('team').value,
          'birthDay':this.addPlayer.get('birthDay').value,
          'yerseyNumber':this.addPlayer.get('yerseyNumber').value,
          'gender':this.addPlayer.get('gender').value,
          'nonPlayer':this.addPlayer.get('nonPlayer').value,
          'managerAccess':this.addPlayer.get('managerAccess').value,
          'positions':[this.addPlayer.get('positions').value]
        }
        this.teamservice.createPlayer(player).subscribe(
          data=>{
            this.showSuccess();
            this.addPlayer.reset();
          },
          error=>{
            this.showError(error)
            console.log(error)
          }
        )
      },
      error=>{
        this.showError(error)
        console.log(error)
      }
    )

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
      nonPlayer:['', Validators.required],
      managerAccess:['', Validators.required],
      team:['', Validators.required],
      contacts_type:['', Validators.required],
      contacts_val:['', Validators.required],
      contacts_name:['', Validators.required],
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
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess() {
    this.toastr.success('Well Done', 'Your player was added Successfully',{positionClass:"toast-top-center"});
  }
  addMoreContact(){
    // let i=window.document.getElementsByClassName('contacts-container').length;
    // console.log(i);
    //this.contacts.nativeElement.insertAdjacentHTML('beforeend', `<div class="row contacts-container" style="margin-top:20px"><div class="col-6"><select class="form-control" formControlName="contacts_type"><option value="email">Email</option><option value="phone">Phone</option></select></div><div class="col-6"><input type="text" placeholder="value" class="form-control" formControlName="contacts_val"></div></div>`);
    //this.contacts.nativeElement.innerHTML = `<select class="form-control"><option value="email">Email</option><option value="phone">Phone</option></select><input type="text" placeholder="value" class="form-control">`
  }
}
