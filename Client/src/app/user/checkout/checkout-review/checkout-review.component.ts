import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { IBasket, IBasketItem } from './../../../shared/models/basket';
import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() stepper : CdkStepper;
  basket$:Observable<IBasket>;

  constructor(private basketService:BasketService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createIntentPayment(){
    this.basketService.createPaymentIntent().subscribe(
      (res : IBasket) =>{
        this.toastr.success("payment intent created");
        this.stepper.next();
      },err=>{
        this.toastr.error(err.message);
      }
    )
  }

}
