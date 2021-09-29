import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { shopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseURL = "https://localhost:44332/api/products/"; 
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

    return this.http.get<IPagination>(this.baseURL, {observe: 'response',params})
    .pipe(
      map(response =>{
        return response.body;
      })
    );
  }

  CreateProduct(newProduct:any){
    return this.http.post(this.baseURL,newProduct);
  }

  GetProduct(id:number){
    return this.http.get<IProduct>(this.baseURL+"product/"+id);
  }
}