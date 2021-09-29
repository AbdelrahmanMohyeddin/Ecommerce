import { Observable } from 'rxjs';
import { IBasket, IBasketTotals } from './../../shared/models/basket';
import { AccountService } from './../../account/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validate } from 'uuid';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkOutForm : FormGroup
  basketTotals$ : Observable<IBasketTotals>
  constructor(private fb : FormBuilder,private accountService:AccountService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotals$ = this.basketService.basketTotal$;
    this.createCheckOutForm();
    this.getDeliveryMethodValue();
    this.getUserAddress();
  }

  createCheckOutForm(){
    this.checkOutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null,Validators.required],
        lastName: [null,Validators.required],
        city: [null,Validators.required],
        state: [null,Validators.required],
        street: [null,Validators.required],
        zipCode: [null,Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null,[Validators.required]],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null,Validators.required],
      })
    });
  }

  getUserAddress(){
    this.accountService.getUserAddress().subscribe(
      (res)=>{
        if(res){
          this.checkOutForm.get('addressForm')?.patchValue(res);
        }
      },err=>{
        console.log(err);
      }
    )
  }

  getDeliveryMethodValue() {
    var basket = this.basketService.getCurrentBasketValue();
    if(basket?.deliveryMethodId != null){
      this.checkOutForm.get("deliveryForm").get("deliveryMethod").patchValue(basket.paymentIntentId);
    }
  }

}
