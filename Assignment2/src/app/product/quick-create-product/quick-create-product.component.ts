import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IModes, IProduct } from 'src/app/shared/data-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})
export class QuickCreateProductComponent {

  @ViewChild('quickCreateForm') form : NgForm;
  successMessage: string = '';

  modes: IModes;
  editMode: boolean = true;
  createMode: boolean = true;
  searchMode: boolean = false;
  deleteMode: boolean = true;



  constructor(private productService: ProductService, private router: Router){

  }

  ngOnInit(){
    this.productService.getSettingModes().subscribe((value) => {
      this.modes = value[0];
      console.log(this.modes);
      this.editMode = this.modes.edit;
      this.createMode = this.modes.create;
      this.deleteMode = this.modes.delete
      this.searchMode = this.modes.search

      console.log(this.editMode);
      console.log(this.createMode);
      console.log(this.searchMode);
      console.log(this.deleteMode);
    });
  }

  saveProduct(data: IProduct){

    if(this.createMode){
      this.productService.createProduct(data);
    this.form.reset();
    this.productService.isCreatedError.subscribe((isError) => {
      if(!isError){
        this.successMessage = 'Product Added Successfully :-)';
      }
      setTimeout(() => {
        this.successMessage = '';
      },3000)
    })
    }
    else {
      this.successMessage = "Sorry, You don't have the access to edit";
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
      
    }
    
  }

  onCancel(){
    if(this.form.valid){
      alert("Are you sure you want to leave?");
    }
    this.router.navigate(['/homescreen']);

  }

}
