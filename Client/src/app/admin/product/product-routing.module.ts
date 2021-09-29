import { ShowProductComponent } from './show-product/show-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes:Routes = [
  {path:'',component:ProductComponent,children:[
   {path:'admin/create',component:CreateProductComponent},
   {path:'admin/update',component:UpdateProductComponent},
   {path:'admin/show',component:ShowProductComponent},
  ]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
