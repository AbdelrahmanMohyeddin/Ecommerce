import { shopParams } from './../shared/models/shopParams';
import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { delay } from 'q';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURL = "https://localhost:44332/api/"; 
  constructor(private http:HttpClient) { }

  GetPeoducts(shopParams:shopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId',shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId',shopParams.typeId.toString());
    }

    if(shopParams.search != ''){
      params = params.append('search', shopParams.search);
    }
    
    params = params.append('sort',shopParams.sort);
    params = params.append('pageSize',shopParams.pageSize.toString());
    params = params.append('pageIndex',shopParams.pageNumber?.toString());

    return this.http.get<IPagination>(this.baseURL+'products', {observe: 'response',params})
    .pipe(
      map(response =>{
        return response.body;
      })
    );
  }

  GetBrands(){
    return this.http.get<IBrand[]>(this.baseURL+'products/brands');
  }

  GetProductTypes(){
    return this.http.get<IProductType[]>(this.baseURL+'products/types');
  }

  GetProduct(id:number){
    return this.http.get<IProduct>(this.baseURL+"products/product/"+id);
  }
}
