import { AppPage } from './../../../e2e/src/app.po';
import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { shopParams } from '../shared/models/shopParams';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products:IProduct[];
  brands: IBrand[];
  types:IProductType[];
  totalCount: number;
  shopParams = new shopParams();
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
    this.service.GetPeoducts(this.shopParams).subscribe(
      (response) =>{
        if(response){
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
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
    this.shopParams.brandId = brandId;
    this.Products();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.Products();
  }

  onSortChanged(sort:string){
    this.shopParams.sort = sort;
    this.Products();
  }

  onPageChanged(event : any){
    this.shopParams.pageNumber = event.page;
    console.log(event.page);
    this.Products();
  }

  getNumberOfProductInPage(total:number, current:number){
    return (total < current ? total : current);
  }
}
