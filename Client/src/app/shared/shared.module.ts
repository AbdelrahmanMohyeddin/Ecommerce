import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopHeaderComponent } from './component/shop-header/shop-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { ShopSearchComponent } from './component/shop-search/shop-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './component/text-input/text-input.component';
import { OrderTotalsComponent } from './component/order-totals/order-totals.component';

@NgModule({
  declarations: [ShopHeaderComponent, PagerComponent, ShopSearchComponent, TextInputComponent, OrderTotalsComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[
    PaginationModule,
    ShopHeaderComponent,
    PagerComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
