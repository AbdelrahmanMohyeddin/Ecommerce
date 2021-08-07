import { AppPage } from './../../../e2e/src/app.po';
import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { shopParams } from '../shared/models/shopParams';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search' ,{static : true}) searchTerm : ElementRef;
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
    this.shopParams.pageNumber = 1;
    this.Products();
  }

  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.Products();
  }

  onSortChanged(sort:string){
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.Products();
  }

  onPageChanged(event : any){
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event;
      this.Products();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.Products();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new shopParams();
    this.shopParams.pageNumber = 1;
    this.Products();
  }
}
