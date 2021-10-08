import { ProductsComponent } from './products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path:'',component:ProductsComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
