import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/data-types';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((result: any) => {
      console.log(result);
      this.productService.getProduct(result.id).subscribe((data) => {
        this.product = data;
      });
    });
  }

  removeProduct(id) {
    let result: boolean = confirm("Are you sure that you want to remove this item?");
    if (result) {
      this.productService.deleteProduct(id);
      this.router.navigate(['/homescreen']);
    }
  }

}
