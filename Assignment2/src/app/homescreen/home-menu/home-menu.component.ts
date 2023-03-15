import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, pluck, startWith, Subject, switchMap } from 'rxjs';
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
  searchbox2: FormGroup;
  modes: IModes;
  editMode: boolean = true;
  createMode: boolean = true;
  searchMode: boolean = false;
  deleteMode: boolean = true;
  userType: string = '';

  constructor(private productService: ProductService, private router: Router, private signupService: SignupService) {

  }

  ngOnInit(): void {
    this.list();

    this.productService.getSettingModes().subscribe((value) => {
      this.modes = value[0];
      console.log(this.modes);
      this.editMode = this.modes.edit;
      this.createMode = this.modes.create;
      this.deleteMode = this.modes.delete;
      this.searchMode = this.modes.search;
    });

    this.searchbox2 = new FormGroup({
      query: new FormControl('')
    });


  }

  ngAfterViewInit(): void {

    if (this.searchMode || this.signupService.userType === 'admin') {
      this.userType = 'admin';
      const searchbox2Value = this.searchbox2.valueChanges;

      searchbox2Value.pipe(
        filter(() => this.searchbox2.valid),
        pluck('query'),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(result => this.productService.filterProducts(result))

      )
        .subscribe(data => {
          console.log(data);
          this.products = data;
        });
    }
  }

  checkboxValueChanged(element, id: number) {
    if (element.target.checked)
      this.isAnyCheckboxTicked[id] = true;
    else
      delete this.isAnyCheckboxTicked[id];
  }

  deleteSelectedProducts() {
    if (this.deleteMode || this.signupService.userType === 'admin') {
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
      this.productDeleteMessage = "Sorry, You don't have the access to edit :-(";
      setTimeout(() => {
        this.productDeleteMessage = "";
      }, 3000);
    }
  }

  list() {
    this.productService.getProductList().subscribe((result) => {
      this.products = result;
    });
  }

  objectLength(): boolean {
    if (Object.keys(this.isAnyCheckboxTicked).length === 0) {
      return false;
    }
    return true;
  }

  descendingOrder() {
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
  }


  ascendingOrder() {
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
  }

  removeProduct(id) {
    let result: boolean = confirm("Are you sure that you want to remove this item?");
    if (result) {
      this.productService.deleteProduct(id);
      this.router.navigate(["/homescreen"]);
      this.list();
    }
  }

  search() {
    let filteredProducts: IProduct[] = [];

    this.productService.filterProducts(this.searchkeyWord).subscribe((result: any) => {
      console.log('Search Found!');
      result.forEach(item => {
        filteredProducts.push(item);
      });
    });
    this.searchArray = filteredProducts;
  }

}
