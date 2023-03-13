import { AfterContentChecked, Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, elementAt, switchMap } from 'rxjs';
import { ProductService } from 'src/app/product/product.service';
import { IModes, IProduct } from 'src/app/shared/data-types';
import { SignupService } from 'src/app/shared/header/services/signup.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {

  products;
  checkboxTicked: boolean[] = [];
  isAnyCheckboxTicked = {};
  checkboxTickedidArray: string[] = [];
  productDeleteMessage = '';
  showDetails: boolean = false;
  searchkeyWord: string = '';
  searchArray = [];
  query: string = '';

  searchbox2: FormGroup = new FormGroup({
    query: new FormControl('')
  })


  modes: IModes;
  editMode: boolean = true;
  createMode: boolean = true;
  searchMode: boolean = false;
  deleteMode: boolean = true;



  constructor(private productService: ProductService, private router: Router, private signupService: SignupService){
  
    
    }
  ngOnInit(): void {
    this.list();
    // this.productService.productList.subscribe((value) => {
    //   console.log(value);
    //   this.products = value;
    // });
    // this.productService.productList;
    // console.log(this.products);
    // console.log(this.productService.productList)

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



  checkboxValueChanged(element, id: number){
    console.log(element);
    console.log(element.target.checked);
    if(element.target.checked){
      // this.checkboxTicked.push(true);
      // this.idArray.push(id);
      this.isAnyCheckboxTicked[id] = true;
      console.log(this.isAnyCheckboxTicked);

    }
    else{
      delete this.isAnyCheckboxTicked[id];
      console.log(this.isAnyCheckboxTicked);


    //   this.checkboxTicked.pop();
    //   this.idArray.
    //   this.isAnyCheckboxTicked--;
    // 

    }
   
    
  }



  deleteSelectedProducts(){

    if(this.deleteMode || this.signupService.userType === 'admin'){
      this.checkboxTickedidArray = Object.keys(this.isAnyCheckboxTicked);
    this.checkboxTickedidArray.forEach(element => {
      this.productService.deleteProduct(element);
      this.productService.isDeletedError.subscribe((result) => {
        this.productDeleteMessage = this.productService.deletedProductMessage;
        console.log(this.productDeleteMessage);
        setTimeout(() => {
          this.productDeleteMessage = '';
       }, 3000);
      })
    });
    this.isAnyCheckboxTicked = {};
    this.list();
    }
    else {
      this.productDeleteMessage = "Sorry, You don't have the access to edit";
      setTimeout(() => {
        this.productDeleteMessage = "";
      }, 3000);
    }

    
    // this.isAnyCheckboxTicked
  }  


  list(){
    this.productService.getProductList().subscribe((result) => {
      this.products = result;
    });
  }

  objectLength(): boolean{
    if(Object.keys(this.isAnyCheckboxTicked).length === 0){
      return false;
    }
    return true;
  }

  descendingOrder(){
    // let min: number = 0;
    // this.products.forEach((product) => {
    //   console.log(product.stock);
    //   if()
    // })
    // let min = 0;
    // for(let i=0; i<this.products.length-1; i++){
    //   for(let j=i+1; j<this.products.length-1; j++){
    //     if(this.products[i].stock < this.products[j].stock){
    //       let temp = this.products[i];
    //     this.products[i] = this.products[i+1];
    //     this.products[i+1] = temp;
    //     }
    //   }
    // }

    let i = 0;
    while (i < this.products.length) {
      let j = i + 1;
      while (j < this.products.length) {
           
          if (this.products[j].stock > this.products[i].stock) {
              var temp = this.products[i].stock;
              this.products[i].stock = this.products[j].stock;
              this.products[j].stock = temp;
          }
          j++;
      }
      i++;
  }
    console.log(this.products);
  }


  ascendingOrder(){
    // for(let i=0; i<this.products.length-1; i++){
    //   for(let j=i+1; j<this.products.length-1; j++){
    //     if(this.products[i].stock > this.products[j].stock){
    //       let temp = this.products[i];
    //     this.products[i] = this.products[i+1];
    //     this.products[i+1] = temp;
    //     }
    //   }
    // }
    let i = 0;
    while (i < this.products.length) {
      let j = i + 1;
      while (j < this.products.length) {
           
          if (this.products[j].stock < this.products[i].stock) {
              var temp = this.products[i].stock;
              this.products[i].stock = this.products[j].stock;
              this.products[j].stock = temp;
          }
          j++;
      }
      i++;
  }
    console.log(this.products)
  }

  removeProduct(id){
    let result: boolean = confirm("Are you sure that you want to remove this item?");
    if(result){
      this.productService.deleteProduct(id);
      this.router.navigate(["/homescreen"]);
      this.list();

    }
  }

  search(){
    let filteredProducts: IProduct[] = [];

    console.log(this.products);
    this.products.forEach(element => {
      if(element.pname.includes(this.searchkeyWord) || 
      element.heading.includes(this.searchkeyWord) || 
      element.subheading.includes(this.searchkeyWord) || 
      element.tags.indexOf(this.searchkeyWord) >= 0){
        console.warn(element.pname.includes(this.searchkeyWord))
      
        console.warn(element.heading.includes(this.searchkeyWord))
      console.warn(element.subheading.includes(this.searchkeyWord)) 
      console.warn(element.tags.indexOf(this.searchkeyWord))
      
        console.log("found");
        filteredProducts.push(element);
      }
    });
    console.log(filteredProducts);
    this.searchArray = filteredProducts;
  
  
  }
  
  // resetFiltered(){
  //   if(!this.searchkeyWord){
  //     this.filteredProducts.forEach(element => {
  //       this.filteredProducts.pop();
  //     })
 //   }
 // }





}
