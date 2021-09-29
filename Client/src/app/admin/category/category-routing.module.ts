import { CategoryComponent } from './category.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path:'',component:CategoryComponent,children:[
    
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],exports:[
    RouterModule
  ]
})
export class CategoryRoutingModule { }
