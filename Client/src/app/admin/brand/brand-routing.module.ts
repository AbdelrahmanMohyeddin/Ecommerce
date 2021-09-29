import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';

const routes:Routes = [
  {path:'',component:BrandComponent,children:[]}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],exports:[
    RouterModule
  ]
})
export class BrandRoutingModule { }
