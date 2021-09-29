import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const productModule = () => import('./product/product.module').then(x => x.ProductModule);
const categoryModule = () => import('./category/category.module').then(x => x.CategoryModule);
const brandModule = () => import('./brand/brand.module').then(x => x.BrandModule);

const routes:Routes = [
  {path:'',component:AdminComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'product',loadChildren:productModule},
    {path:'category',loadChildren:categoryModule},
    {path:'brand',loadChildren:brandModule}
  ]},
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
