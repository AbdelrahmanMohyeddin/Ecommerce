import { IBasketTotals } from './../../shared/models/basket';
import { OrderService } from './../order.service';
import { IOrder, IOrderItem } from './../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order : IOrder;
  orderId:number;
  
  constructor(private route : ActivatedRoute,private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.getOrderById();
  }

  getOrderById(){
    this.orderService.getUserOrderById(this.orderId).subscribe(
      (res : IOrder) =>{
        this.order = res;
      },err=>{
        console.log(err);
      }
    )
  }

  getOrderTotals() : IBasketTotals{
    return {
      subTotal : this.order?.subtotal,
      shipping : this.order?.shippingPrice,
      total : this.order?.total,
    };
  }

}
