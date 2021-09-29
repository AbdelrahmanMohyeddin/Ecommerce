import { SharedModule } from './../../shared/shared.module';
import { BasketRoutingModule } from './basket-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';



@NgModule({
  declarations: [BasketComponent],
  imports: [
    BasketRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class BasketModule { }
