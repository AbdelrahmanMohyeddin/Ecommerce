import { BasketService } from './../../../basket/basket.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  @Input() basketTotal : IBasketTotals;
  constructor(private basketService : BasketService) { }

  ngOnInit(): void {
  }
}
