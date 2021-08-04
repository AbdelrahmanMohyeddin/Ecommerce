import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products:IProduct[] | undefined;
  brands: IBrand[];
  types:IProductType[];
  brandSelected = 0;
  typeSelected = 0;
  sortSelected = "name";
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Low to High',value:'PriceAsc'},
    {name:'High to Low',value:'PriceDesc'}
  ]
  constructor(private service : ShopService) { }

  ngOnInit(): void {
    this.Products();
    this.ProductsBrands();
    this.ProductsTypes();
  }

  Products(){
    this.service.GetPeoducts(this.brandSelected,this.typeSelected,this.sortSelected).subscribe(
      (response) =>{
        this.products = response?.data;
      },
      (error : any) =>{
        console.log(error);
      }
    )
  }

  ProductsBrands(){
    this.service.GetBrands().subscribe(
      (res) =>{
        this.brands = [{id:0,name:'All'},...res];
      },
      (error : any) =>{
        console.log(error);
      }
    )
  }

  ProductsTypes(){
    this.service.GetProductTypes().subscribe(
      (res) =>{
        this.types = [{id:0,name:'All'},...res];
      },
      (error : any) =>{
        console.log(error);
      }
    )
  }

  onBrandSelected(brandId : number){
    this.brandSelected = brandId;
    this.Products();
  }

  onTypeSelected(typeId : number){
    this.typeSelected = typeId;
    this.Products();
  }

  onSortChanged(sort:string){
    this.sortSelected = sort;
    this.Products();
  }


}
