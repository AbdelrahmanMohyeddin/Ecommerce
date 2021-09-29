import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ShowProductComponent } from './show-product/show-product.component';



@NgModule({
  declarations: [ProductComponent, UpdateProductComponent, ShowProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
