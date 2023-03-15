import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IModes, IProduct } from 'src/app/shared/data-types';
import { SignupService } from 'src/app/shared/header/services/signup.service';
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
  createMode: boolean = true;
  searchMode: boolean = false;
  deleteMode: boolean = true;
  errorMessage = "No more tags can't be added";


  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private signupService: SignupService) {

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
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((data) => {
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
    });
  }

  saveProduct() {
    if (this.createMode || this.signupService.userType === 'admin') {
      this.productService.createProduct(this.createProductForm.value);
      this.createProductForm.reset();

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
      this.successMessage = 'Sorry, You dont have the access.';
    }
  }

  onCancel() {
    if (this.createProductForm.valid) {
      alert("Are you sure you want to leave?");
    }
    this.router.navigate(['/homescreen']);
  }

  addInputTags() {
    if (this.addInputTagButtonClicked < 9) {
      (<FormArray>this.createProductForm.get('tags')).push(new FormControl(null));
      this.addInputTagButtonClicked++;
    }
  }

  editProduct() {
    if (this.editMode || this.signupService.userType === 'admin') {
      this.productService.updateProduct(this.createProductForm.value, this.productId).subscribe((result) => {
        if (result) 
          this.successMessage = "Product has been updated successfully :-)";
      })
      this.productId = null;
    }
    else {
      console.log('helo')
      this.successMessage = 'Sorry, you dont have the access.';
    }
    setTimeout(() => {
      this.successMessage = '';
    },3000);
    this.router.navigate(['/homescreen']);
  }

}
