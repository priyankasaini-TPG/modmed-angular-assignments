import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IModes, IProduct } from 'src/app/shared/data-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup;
  issavebuttonDisable: boolean;
  successMessage: string = '';
  addInputTagButtonClicked: number = 0;
  productId: string;
  productData: undefined | IProduct;
  modes: IModes;
  editMode: boolean = true;
  createMode: boolean = true;;
  searchMode: boolean = false;
  deleteMode: boolean = true;;


  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
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
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
      })
    }

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



  saveProduct() {
    // if (this.productId == null) {

    if(this.createMode){
      console.log(this.createProductForm);
    this.productService.createProduct(this.createProductForm.value);
    this.createProductForm.reset();
    // this.successMessage = this.productService.createProductMessage;
    // console.log(this.successMessage);
    this.productService.isCreatedError.subscribe((isError) => {
      if (!isError) {
        this.successMessage = 'Product Added Successfully :-)';
      }
      setTimeout(() => {
        this.successMessage = '';
      }, 3000)
    })
    }
    else {
      this.successMessage = "Sorry, You don't have the access to edit";
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
      
    }
    
    // }
    // else {
    //   this.editProduct(this.createProductForm.value, this.productId);
    // }

  }

  onCancel() {
    if (this.createProductForm.valid) {
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


  addInputTags() {
    if (this.addInputTagButtonClicked < 9) {
      (<FormArray>this.createProductForm.get('tags')).push(new FormControl(null));
      this.addInputTagButtonClicked++;
    }
    else {
      this.successMessage = "No More Tags can be added."
      setTimeout(() => {
        this.successMessage = "";
      }, 2000);
    }

  }
  editProduct() {
    // this.modes.array.forEach(mode => {
    //   editMode = mode.edit
    // });
    // console.log(editMode);
    // if(editMode){

    // console.log(this.editMode);
    // console.log(this.createMode);
    // console.log(this.searchMode);
    // console.log(this.deleteMode);

    if (this.editMode) {
      this.productService.updateProduct(this.createProductForm.value, this.productId).subscribe((result) => {
        if (result) {
          this.successMessage = "Product has been updated successfully :-)";
        }
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      })
      this.productId = null;
    }
    else {
      this.successMessage = "Sorry, You don't have the access to edit";
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
      
    }

    setTimeout(()=> {
      this.router.navigate(['/homescreen']);
    }, 3000)



    

  }

}
