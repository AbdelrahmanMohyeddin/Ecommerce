import { map } from 'rxjs/operators';
import { IOrder } from './../../shared/models/order';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl + 'orders/';
  constructor(private http:HttpClient) { }

  getUserOrders(){
    return this.http.get<IOrder[]>(this.baseUrl);
  }

  getUserOrderById(id:number){
    return this.http.get<IOrder>(this.baseUrl + id);
  }
}
