import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/data-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})
export class QuickCreateProductComponent {

  @ViewChild('quickCreateForm') form : NgForm;
  successMessage: string = '';



  constructor(private productService: ProductService, private router: Router){

  }

  saveProduct(data: IProduct){
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

  onCancel(){
    if(this.form.valid){
      alert("Are you sure you want to leave?");
    }
    this.router.navigate(['/homescreen']);

  }

}
