import { IProductType } from './../shared/models/productType';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL = "https://localhost:44332/api/Categories/";
  constructor(private http:HttpClient) { }

  CreateCategory(category:any){
    return this.http.post<IProductType>(this.baseURL,category);
  }

  UpdateCategory(category:any){
    return this.http.put(this.baseURL,category);
  }

  GetCategories(){
    return this.http.get<IProductType[]>(this.baseURL);
  }

  GetCategoryById(category:any){
    return this.http.get<IProductType>(this.baseURL+category.id);
  }

  DeleteCategory(category:any){
    return this.http.delete(this.baseURL,category);
  }
}
