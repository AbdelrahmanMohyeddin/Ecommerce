import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseURL = "https://localhost:44332/api/brands/";
  constructor(private http:HttpClient) { }

  CreateBrand(brand:any){
    return this.http.post<IBrand>(this.baseURL,brand);
  }

  UpdateBrand(brand:any){
    return this.http.put(this.baseURL,brand);
  }

  GetBrands(){
    return this.http.get<IBrand[]>(this.baseURL);
  }

  GetBrandById(brand:any){
    return this.http.get<IBrand>(this.baseURL+brand.id);
  }

  DeleteBrand(brand:any){
    return this.http.delete(this.baseURL,brand);
  }
}
