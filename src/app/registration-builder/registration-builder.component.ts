import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from '../services/team.service';
import {AuthenticationService} from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration-builder',
  templateUrl: './registration-builder.component.html',
  styleUrls: ['./registration-builder.component.scss']
})
export class RegistrationBuilderComponent implements OnInit {
	form:any={ fields : [] };
	editForm:boolean=false;
	formEdit:FormGroup;
	builderForm:FormGroup;
	teams:any;
	userData:any;
  constructor(private fb:FormBuilder, private teamService: TeamService, private auth: AuthenticationService, private toast:ToastrService) { }

  ngOnInit() {
  	//get user info from login
  	this.getUserInfo();
  	//add required fields to form
  	this.form.fields.push({
      label: 'Participant First Name',
      type: "text",
      required:true,
      col:6,
      desc:'User Name',
      order:1,
    },
    {
      label: 'Participant Last Name',
      type: "text",
      required:true,
      col:6,
      desc:'User Name',
      order:1
    },
    {
    	label: 'Participant Email',
      	type: "email",
      	required:true,
      	col:12,
      	desc:'User Email',
      	order:2
    });
    //create form to edit the fields values
    this.formEdit=this.fb.group({
    	label:['', Validators],
    	description:['', Validators],
    	required:[''],
    	index:['']
    })
    //create form to save the forms
    this.builderForm=this.fb.group({
    	title:['', Validators.required],
    	description:['', Validators.required],
    	team:['', Validators.required]
    })
  }
  getUserInfo(){
    this.userData= this.auth.userLogged();
    this.getTeams();
  }
  //get teams by current user
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
  //show the edit form with the default data
  ShowEditForm(data, index){
  	this.editForm=true;
  	console.log(data[index])
  	this.formEdit=this.fb.group({
      label:[data[index].label,Validators.required],
      description:[data[index].desc,Validators.required],
      required:[data[index].required],
      index:[index]
    });
  }
  //save the forms
  saveForm(){
  	//create the json data
  	let data={
  		'title':this.builderForm.get('title').value,
  		'description':this.builderForm.get('description').value,
  		'team':this.builderForm.get('team').value,
  		'fields':this.form.fields
  	}
  	//send the data to service
  	this.teamService.formBuilder(data).subscribe(
  		result=>{
  			this.showSuccess('Form was saved');
  		},
  		error=>{
  			this.showError(error)
  			console.log(error)
  		}
  	)
  }
  //save the data edited
  saveDataEdited(){
  	//get the array index
  	let index=this.formEdit.get('index').value;
  	//save preview data before save the new one
  	let oldData=this.form.fields[index];
  	//create the new data
  	this.form.fields[index]={
  		label:this.formEdit.get('label').value,
  		type: oldData.type,
  		required:this.formEdit.get('required').value,
  		col:oldData.col,
  		desc:this.formEdit.get('description').value,
  		order:oldData.order,
  	}
  	//hide the form
  	this.editForm=false
  	//clean the form
  	this.formEdit.reset
  }
  //add new input to the form
  addInput(label, type, required, col, desc){
  	let orderPlus=this.form.fields[this.form.fields.length - 1].order;
  	//school has two inputs. so here is adding school and grade
  	if(label=="School"){
  		this.form.fields.push({
	      label: label,
	      type: type,
	      required:required,
	      col:col,
	      desc:desc,
	      order:orderPlus+1
	    },{
	    	label: 'grade',
	      	type: type,
	      	required:required,
	      	col:col,
	      	desc:desc,
	      	order:orderPlus+1
	    });
  	} //address has many inputs.
  	else if(label=="Address"){
  		this.form.fields.push({
  			label:"Street Address",
  			type: type,
	      	required:required,
	      	col:col,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"Apartment, Suite, unit etc",
  			type: type,
	      	required:required,
	      	col:col,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"City",
  			type: type,
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"Zip Code / Postal Code",
  			type: "number",
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"Select a State",
  			type: "select",
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"select a country",
  			type: "select",
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		})
  	}//emergency has many inputs.
  	else if(label=="Emergency"){
  		this.form.fields.push({
  			label:"Emergency Contact Name",
  			type: "text",
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"Emergency Contact Relationship",
  			type: "text",
	      	required:required,
	      	col:6,
	      	desc:desc,
	      	order:orderPlus+1
  		},
  		{
  			label:"Emergency Contact Phone",
  			type: "tel",
	      	required:required,
	      	col:12,
	      	desc:desc,
	      	order:orderPlus+1
  		})
  	}//when only need to add one input
  	else{
	  	this.form.fields.push({
	      label: label,
	      type: type,
	      required:required,
	      col:col,
	      desc:desc,
	      order:orderPlus+1
	    });
  	}
  }
  showError(e){
  	this.toast.error(e,"Error",{positionClass:"toast-top-center"})
  }
  showSuccess(s){
  	this.toast.success(s,"Well Done",{positionClass:"toast-top-center"})
  }
}
