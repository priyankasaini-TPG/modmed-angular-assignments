import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent {

  Name: string  = "";
  CName: string = "";
  defaultDegree: string = 'B.Tech';
  Specialization: string = "";

  @ViewChild('myform') form?: NgForm;

  constructor(private user: UserService){

  }

  onSubmit(){
    console.log(this.form);
  }

  clearAll(){
    this.Name = "";
    this.CName = "";
    this.defaultDegree = "";
    this.Specialization = "";
  }

  addUser(){
    this.user.userAdded(this.Name);
    console.log(this.user.usersArray);
  }

}
