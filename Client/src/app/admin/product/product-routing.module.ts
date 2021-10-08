import { ShowProductComponent } from './show-product/show-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const productsModule = ()=> import('./products/products.module').then(x=>x.ProductsModule);

const routes:Routes = [
  {path:'',component:ProductComponent,children:[
   {path:'',loadChildren:productsModule},
   {path:'create',component:CreateProductComponent},
   {path:'update/:id',component:UpdateProductComponent},
   {path:'show/:id',component:ShowProductComponent},
  ]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
