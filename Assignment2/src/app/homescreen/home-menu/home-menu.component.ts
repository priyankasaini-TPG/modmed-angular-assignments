import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { IProduct } from 'src/app/shared/data-types';

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


  constructor(private productService: ProductService, private router: Router){

  }
  ngOnInit() {
    this.list();
    // this.productService.productList.subscribe((value) => {
    //   console.log(value);
    //   this.products = value;
    // });
    // this.productService.productList;
    // console.log(this.products);
    // console.log(this.productService.productList)
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
    let min = 0;
    for(let i=0; i<this.products.length-1; i++){
      for(let j=i+1; j<this.products.length-1; j++){
        if(this.products[i].stock < this.products[j].stock){
          let temp = this.products[i];
        this.products[i] = this.products[i+1];
        this.products[i+1] = temp;
        }
      }
    }
    console.log(this.products);
  }

  ascendingOrder(){
    for(let i=0; i<this.products.length-1; i++){
      for(let j=i+1; j<this.products.length-1; j++){
        if(this.products[i].stock > this.products[j].stock){
          let temp = this.products[i];
        this.products[i] = this.products[i+1];
        this.products[i+1] = temp;
        }
      }
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
  



}
