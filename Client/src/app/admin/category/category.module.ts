import { CategoryRoutingModule } from './category-routing.module';
import { RouterModule } from '@angular/router';
import { BrandRoutingModule } from './../brand/brand-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';



@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    RouterModule
  ]
})
export class CategoryModule { }
