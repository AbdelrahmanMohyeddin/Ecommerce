import { IDeliveryMethod } from './../../shared/models/deliveryMethod';
import { IProduct } from './../../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Basket, IBasket, IBasketItem, IBasketTotals } from './../../shared/models/basket';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();  
  shipping = 0;

  constructor(private http:HttpClient) { }

  createPaymentIntent(){
    return this.http.post<IBasket>(this.baseUrl + "payment/" + this.getCurrentBasketValue().id,{})
    .pipe(
      map((res : IBasket) =>{
        this.basketSource.next(res);
        return res;
      })
    );
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
    this.shipping = deliveryMethod.price;
    var basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }

  getBasket(id:string){
    return this.http.get<IBasket>(this.baseUrl+'basket?id='+id).pipe(
      map((basket:IBasket)=>{
        this.basketSource.next(basket);
        this.shipping = basket.shippingPrice;
        this.calculateTotals();
      })
    )
  }

  setBasket(basket:IBasket){
    return this.http.post<any>(this.baseUrl+'basket',basket).subscribe(
      (response:IBasket)=>{
        this.basketSource.next(response);
        this.calculateTotals();
      },err =>{
        console.log(err);
      }
    )
  }

  addItemToBasket(item:IProduct, quantity = 1){
    let itemToAdd: IBasketItem = this.mapIProductItemToIBasketItem(item,quantity);
    let basket:IBasket = this.getCurrentBasketValue()?? this.createBasket();
    basket.items = this.addItemOrUpdateItem(basket.items,itemToAdd,quantity);
    this.setBasket(basket);
  }

  addItemOrUpdateItem(items:IBasketItem[],itemToAdd:IBasketItem,quantity:number):IBasketItem[]{
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals(){
    let basket = this.getCurrentBasketValue();
    let shipping = this.shipping;
    let subTotal = basket?.items.reduce((a,b) => (b.price * b.quantity) + a,0)??0;
    let total = subTotal + shipping;
    this.basketTotalSource.next({shipping,total,subTotal});
  }

  incrementItemQuantity(item:IBasketItem) : void{
    let basket:IBasket = this.getCurrentBasketValue()?? this.createBasket();
    let index = basket.items.findIndex(i => i.id == item.id);
    basket.items[index].quantity += 1;
    this.setBasket(basket);
  }

  decrementItemQuantity(item:IBasketItem) : void{
    let basket :IBasket = this.getCurrentBasketValue()?? this.createBasket();
    let index = basket.items.findIndex(i => i.id == item.id);
    if(basket.items[index].quantity > 1){
      basket.items[index].quantity -= 1;
      this.setBasket(basket);
    }else{
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item:IBasketItem){
    let basket:IBasket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = basket.items.filter(i => i.id != item.id);
    if(basket.items.length > 0){
      this.setBasket(basket);
    }else{
      this.deleteBasket(basket);
    }
  }

  deleteBasket(basket:IBasket){
    this.http.delete(this.baseUrl+'basket?id='+basket.id).subscribe(
      ()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },err=>{
        console.log(err);
      }
    );
  }

  deleteLocalBasket(id:string){
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }


  createBasket() : IBasket{
    let basket = new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  mapIProductItemToIBasketItem(item:IProduct,quantity = 1):IBasketItem{
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      imageUrl:item.imageUrl,
      brand:item.productBrand,
      type:item.productType,
      quantity:quantity
    };
  }
}
