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
  isVisible:boolean=false;
  perfilImage:string;
  private base64image:String="";
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
    //get user image and show it
    let ramdon = new Date().getTime();
    this.perfilImage=`http://138.68.19.227:8187/images/${ramdon}/users/${this.userData.id}`
  }
  editPerfil(){
    this.teamService.editUser(this.userData.id,this.profileFrom.value).subscribe(
      result=>{
        //if everthing if correct update cookie.
        this.auth.updateCookie(this.userData,result);
        //update form value with new one
        this.addValuetoEditPerfil(result);
        this.getUserInfo();
        this.showSuccess('Everything was Changed Successfully');
        //hide edit form
        this.editForm=false;
      },
      error=>{
        console.log(error)
        this.showError('Something went wrong. Please try again')
      }
    )
  }
  changePassword(){
    //if new password and repassword are correct change password
    if (this.changePasswordForm.get('new').value==this.changePasswordForm.get('repeat').value) {
      //create json with the new password
      let data={'id':this.userData.id,'password':this.changePasswordForm.get('current').value,'newPassword':this.changePasswordForm.get('new').value};
      this.auth.changePassword(data).subscribe(
        result=>{
          //if password was changed show message
          if(result['id']){
            this.showSuccess('Your Password was Changed Successfully')
            this.changePasswordForm.reset;
          }
          //if password was not changed show error
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
  //function to add value to form
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
  updateImage(){
    //prepare json data
    let image={'id':this.userData.id,'image':this.base64image}
    this.teamService.uploadImage(image).subscribe(
    data=>{
      this.showSuccess('Well Done');
      //change float image with the new one
      let preview = document.querySelector('#perfilImage');
      let reader  = new FileReader();
      preview.src = document.getElementById("previewImg").src;
      },
      error=>{
        this.showError(error)
      }
    )
  }
  //function to convert base64 and show a preview
  uploadImage(event:FileList) {
  let preview = document.querySelector('#previewImg');
  let file    = event.item(0);
  this.isVisible=true;
  //to convert base64
  let reader  = new FileReader();
  //to show image
  let reader2  = new FileReader();
  // Client-side validation example
  if (file.type.split('/')[0] !=='image') {
    this.showError('unsupported file type ');
    return;
  }
  reader2.onloadend = function () {
    preview.src = reader2.result;
  }
  if (file) {
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    reader2.readAsDataURL(file);
  }
  
}
_handleReaderLoaded(readerEvt) {
  let binaryString = readerEvt.target.result;
  this.base64image=btoa(binaryString);
}
}
