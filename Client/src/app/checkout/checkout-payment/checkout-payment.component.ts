import { element } from 'protractor';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IOrderToCreate } from './../../shared/models/order';
import { FormGroup } from '@angular/forms';
import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { IBasket } from 'src/app/shared/models/basket';

declare var Stripe;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements AfterViewInit, OnDestroy {
  @Input() checkOutForm : FormGroup
  @ViewChild('cardNumber',{static:true}) cardNumberElement : ElementRef;
  @ViewChild('cardExpiry',{static:true}) cardExpiryElement : ElementRef;
  @ViewChild('cardCvc',{static:true}) cardCvcElement : ElementRef;

  stripe : any;
  cardNumber : any;
  cardExpiry : any;
  cardCvc : any;
  cardError : any;
  cardHandler = this.onChange.bind(this);
  constructor( private checkoutService:CheckoutService,private basketService:BasketService,private router:Router) { }

  ngAfterViewInit() {
    this.stripe = Stripe("pk_test_51JVq99ABzkAkp2lr9kZidDWX6dK6Y97Y2pz8PxQgcVFYmqKxZH7GboB4aBdDuHekEYe7X6mPP0CP1lHO0oHCpOwK00GisXTDGa");
    const elements = this.stripe.elements();
    
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);
    this.cardNumber.addEventListener('change',this.cardHandler);
    
    this.cardExpiry = elements.create("cardExpiry");
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
    this.cardExpiry.addEventListener('change',this.cardHandler);
    
    this.cardCvc = elements.create("cardCvc");
    this.cardCvc.mount(this.cardCvcElement.nativeElement);
    this.cardCvc.addEventListener('change',this.cardHandler);

  }

  ngOnDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  }

  onChange({error}){
    this.cardError =  error ? error.message : null;
  }

  submitOrder(){
    let basket = this.basketService.getCurrentBasketValue();
    if(basket){
      this.createOrder(basket);
    }
  }

  createOrder(basket:IBasket){
    let orderToCreate : IOrderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(res =>{
      this.router.navigate(['checkout/success']);
    },err=>{
      console.log(err);
    });
  }

  getOrderToCreate(basket:IBasket) : IOrderToCreate{
    return {
      basketId : basket.id,
      deliveryMethodId: +this.checkOutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      shipToAddress: this.checkOutForm.get('addressForm')?.value
    }
  }
 

}
