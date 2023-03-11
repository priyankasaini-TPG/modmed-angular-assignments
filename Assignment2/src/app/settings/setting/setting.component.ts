import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/product/product.service';
import { IModes } from 'src/app/shared/data-types';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{

  @ViewChild('settingsForm') form = NgForm;
  edit: boolean = true;
  create: boolean = true;
  search: boolean = true;
  delete: boolean = false;
  modes: IModes;

  constructor(private productService: ProductService){

  }

  ngOnInit() {


  }

  save(data: IModes){
    console.log(data);
    this.modes = data;
    console.log(this.modes)
    // if(this.productService.getSettingModes().)

    this.productService.getSettingModes().subscribe((result: IModes[]) => {
      if(result.length){
        result.forEach((element) => {
          // console.log(element.id)
          this.productService.deleteSettingsModes(element.id);
        });
      }
    })
    console.log('hello')

    this.productService.saveSettingModes(data);



    this.edit = false;
    this.create = false;
    this.search= false;
    this.delete= false;
    
  }

  reset(){
    this.edit = true;
    this.create = true;
    this.search= true;
    this.delete= false;
  }

}
