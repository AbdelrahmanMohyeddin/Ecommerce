import { BasketService } from 'src/app/basket/basket.service';
import { IOrderToCreate ,IOrder} from './../shared/models/order';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + "orders/DeliveryMethod").pipe(
      map((dm:IDeliveryMethod[]) => {
        return dm.sort((a,b) => b.price - a.price);
      })
    );
  }

  createOrder(order:IOrderToCreate){
    return this.http.post(this.baseUrl+"orders",order);
  }
}
