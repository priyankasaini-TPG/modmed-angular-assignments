import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../shared/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // createProductMessage: string = '';
  isProductCreated = new BehaviorSubject<boolean>(false);
  isCreatedError = new EventEmitter<boolean>(true);
  // productList = new EventEmitter<any>();
  deletedProductMessage: string = '';
  isDeletedError = new EventEmitter<boolean>(true);

  constructor(private http: HttpClient) { } 

  createProduct(value: IProduct){
    this.http.post('http://localhost:3000/products',value, { observe: 'response'}).subscribe((result) => {
      console.log(result);
      if(result.body != null){
      //   this.createProductMessage = "Product Added Successfully :-) ";
      //   console.log(this.createProductMessage);
        this.isProductCreated.next(true);
        this.isCreatedError.emit(false);
      }
    });
  
  }

  getProductList(){
    return this.http.get('http://localhost:3000/products');
  //   .subscribe((value: any) => {
  //     // console.log(value);
  //     // this.productList = value;
  //     // console.log(this.productList)
  //     this.productList.emit(value);
  //   })
  // }
  }

  deleteProduct(id){
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe((value) => {
      console.log("item deleted");
      this.deletedProductMessage = "Product Has Been Deleted Successfully :-)";
      this.isDeletedError.emit(false);
    });
  }
}
