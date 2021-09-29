import { RouterModule } from '@angular/router';
import { CdkStepperModule } from '@angular/cdk/stepper';
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
import { StepperComponent } from './component/stepper/stepper.component';
import { BasketSummaryComponent } from './component/basket-summary/basket-summary.component';
import { NotAuthorizedComponent } from './component/not-authorized/not-authorized.component';
@NgModule({
  declarations: [
    StepperComponent,
    ShopHeaderComponent, 
    PagerComponent, 
    ShopSearchComponent, 
    TextInputComponent, 
    OrderTotalsComponent, 
    BasketSummaryComponent, NotAuthorizedComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
  ],
  exports:[
    PaginationModule,
    ShopHeaderComponent,
    PagerComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    OrderTotalsComponent,
    StepperComponent,
    CdkStepperModule,
    BasketSummaryComponent,
    RouterModule
  ]
})
export class SharedModule { }
