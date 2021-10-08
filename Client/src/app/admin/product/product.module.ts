import { CreateProductComponent } from './create-product/create-product.component';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ShowProductComponent } from './show-product/show-product.component';



@NgModule({
  declarations: [
    ProductComponent, 
    UpdateProductComponent, 
    ShowProductComponent,
    CreateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    RouterModule,
    SharedModule,
    CoreModule
  ]
})
export class ProductModule { }
