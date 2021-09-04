import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from './../../shared/models/basket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$:Observable<IBasket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  createIntentPayment(){
    this.basketService.createPaymentIntent().subscribe(
      (res : IBasket) =>{
        console.log(res);
      },err=>{
        console.log(err);
      }
    )
  }

}
