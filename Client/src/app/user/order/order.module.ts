import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [OrderComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }