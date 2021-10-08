import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from './../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
