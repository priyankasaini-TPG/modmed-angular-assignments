import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm : FormGroup;
  issavebuttonDisable: boolean;
  successMessage: string = '';

  constructor(private productService: ProductService, private router: Router){

  }

  ngOnInit(){
    this.createProductForm = new FormGroup(
      {
        pname: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        expiry: new FormControl(null, Validators.required),
        stock: new FormControl(null, [Validators.required, Validators.min(0)]),
        heading: new FormControl(null, Validators.maxLength(150)),
        subheading: new FormControl(null, Validators.maxLength(160)),
        tags: new FormControl(null),
        description: new FormControl(null, Validators.maxLength(250)),
        mindays: new FormControl(null),
        maxdays: new FormControl(null)
      }
    )

    
    
  }

  // ngAfterViewChecked(){
  //   if( this.createProductForm.status === 'VALID' )
  //       this.issavebuttonDisable = false;
  //   else 
  //       this.issavebuttonDisable = true;
  // }

  saveProduct(){
    console.log(this.createProductForm);
    this.productService.createProduct(this.createProductForm.value);
    this.createProductForm.reset();
    // this.successMessage = this.productService.createProductMessage;
    // console.log(this.successMessage);
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
    if(this.createProductForm.valid){
      alert("Are you sure you want to leave?");
    }
    this.router.navigate(['/homescreen']);


  }

  // disable(){
  //   this.createProductForm.statusChanges.subscribe((value: string) => {
  //     console.log(value);
  //     // if(value === 'VALID')
  //     //   return false;
  //   });
  //   // return true;
  // }

  // greaterThanMIN(control: FormControl){
  //   if(control.value != null && control.value['mindays'] != null){
  //     return {require: true}
  //   }
  //   return null;
  // }

}
