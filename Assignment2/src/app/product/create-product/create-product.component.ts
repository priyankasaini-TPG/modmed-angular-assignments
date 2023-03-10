import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/data-types';
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
  addInputTagButtonClicked: number = 0;
  productId: string;
  productData: undefined | IProduct;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute){

  }

  ngOnInit(){
    this.createProductForm = new FormGroup(
      {
        pname: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
        expiry: new FormControl(null, Validators.required),
        stock: new FormControl(null, [Validators.required, Validators.min(0)]),
        heading: new FormControl(null, Validators.maxLength(150)),
        subheading: new FormControl(null, Validators.maxLength(160)),
        tags: new FormArray([
          new FormControl(null)
        ]),
        description: new FormControl(null, Validators.maxLength(250)),
        mindays: new FormControl(null),
        maxdays: new FormControl(null)
      }
    )

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    this.productService.getProduct(this.productId).subscribe((data) => {
      console.log(data);
      this.productData = data;
    })


    
    
  }



  saveProduct(){
    if(this.productId == null){
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
    else {
      this.editProduct(this.createProductForm.value, this.productId);
    }
    
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


  addInputTags(){
    if(this.addInputTagButtonClicked < 9){
      (<FormArray>this.createProductForm.get('tags')).push(new FormControl(null));
      this.addInputTagButtonClicked++;
    }
    else{
      this.successMessage = "No More Tags can be added."
      setTimeout(() => {
        this.successMessage = "";
      },2000);
    }
    
  }
  editProduct(data: IProduct, id: string){
    console.log(data);
    this.productService.updateProduct(data, id).subscribe((result) => {
      if(result){
        this.successMessage = "Product has been updated successfully :-)";
      }
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    })
    this.productId = null;
    
  }
}
