import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  Name: string  = "";
  CName: string = "";
  defaultDegree: string = 'B.Tech';
  Specialization: string = "";

  @ViewChild('myform') form?: NgForm;

  onSubmit(){
    console.log(this.form);
  }

  clearAll(){
    this.Name = "";
    this.CName = "";
    this.defaultDegree = "";
    this.Specialization = "";
  }

}
