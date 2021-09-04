import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from './../checkout.service';
import { IDeliveryMethod } from './../../shared/models/deliveryMethod';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkOutForm :FormGroup
  deliveryMethods: IDeliveryMethod[];
  selectedBasketId:number;
  constructor(private checkoutService: CheckoutService, private basketService:BasketService) { }

  ngOnInit(): void {
    this.selectedBasketId = +this.basketService.getCurrentBasketValue()?.deliveryMethodId;
    this.getDeliveryMethods();
    
  }

  getDeliveryMethods(){
    this.checkoutService.getDeliveryMethods().subscribe(
      (dm:IDeliveryMethod[])=>{
        this.deliveryMethods = dm;
      },err=>{
        console.log(err);
      }
    )
  }

  setShippingPrice(deliveryMethod:IDeliveryMethod){
    this.checkOutForm?.get('deliveryForm')?.get('deliveryMethod')?.setValue(deliveryMethod.id);
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
