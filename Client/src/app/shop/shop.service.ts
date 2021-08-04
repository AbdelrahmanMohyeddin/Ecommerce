import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseURL = "https://localhost:44332/api/"; 
  constructor(private http:HttpClient) { }

  GetPeoducts(brandId?: number , typeId?: number,sort?:string){
    let params = new HttpParams();

    if(brandId){
      params = params.append('brandId',brandId.toString());
    }

    if(typeId){
      params = params.append('typeId',typeId.toString());
    }

    if(sort){
      params = params.append('sort',sort);
    }

    return this.http.get<IPagination>(this.baseURL+'products?pageSize=50', {observe: 'response',params})
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


}
