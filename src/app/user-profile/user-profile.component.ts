import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {TeamService} from '../services/team.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileFrom:FormGroup;
  changePasswordForm:FormGroup;
  userData:any;
  teams:any;
  editForm:boolean=false;
  showForm:boolean=false;
  constructor(private auth: AuthenticationService, private fb:FormBuilder, private teamService: TeamService,private toastr: ToastrService) { 
    this.getUserInfo();
  }
  getUserInfo(){
    this.userData= this.auth.userLogged();
  }
  getTeams(){
    this.teamService.getTeamsByUser(this.userData.role.name,this.userData.id).subscribe(
      data=>{
        this.teams=data;
      },
      error=>{
        console.log(error)
      }
    )
  }
  ngOnInit() {
    this.addValuetoEditPerfil(this.userData)
    this.changePasswordForm=this.fb.group({
      current:['',Validators.required],
      new:['', Validators.required],
      repeat:['', Validators.required],
    })
    this.getTeams();
  }
  editPerfil(){
    this.teamService.editUser(this.userData.id,this.profileFrom.value).subscribe(
      result=>{
        this.auth.updateCookie(this.userData,result);
        this.addValuetoEditPerfil(result);
        this.getUserInfo();
        this.showSuccess('Everything was Changed Successfully');
        this.editForm=false;
      },
      error=>{
        console.log(error)
        this.showError('Something went wrong. Please try again')
      }
    )
  }
  changePassword(){
    if (this.changePasswordForm.get('new').value==this.changePasswordForm.get('repeat').value) {
      let data={'id':this.userData.id,'password':this.changePasswordForm.get('current').value,'newPassword':this.changePasswordForm.get('new').value};
      this.auth.changePassword(data).subscribe(
        result=>{
          if(result['id']){
            this.showSuccess('Your Password was Changed Successfully')
            this.changePasswordForm.reset;
          }
          else if(!result['valid']){
            this.showError('Current Password Incorrect!');
          }
        }
      )
    }
    else{
      this.showError('passwords not match');
    }
  }
  addValuetoEditPerfil(userData){
    this.profileFrom=this.fb.group({
      username:[userData.username,Validators.required],
      firstName:[userData.firstName],
      lastName:[userData.lastName, Validators.required],
      email:[userData.email, Validators.required],
      //teams:['', Validators.required]
    });
  }
  showEditForm(){
    if (this.editForm) {
      this.editForm=false;
    }
    else{
      this.editForm=true;
    }
  }
  showFormPassword(){
    if (this.showForm) {
      this.showForm=false;
    }
    else{
      this.showForm=true;
    }
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess(s) {
    this.toastr.success('Well Done', s,{positionClass:"toast-top-center"});
  }
}
