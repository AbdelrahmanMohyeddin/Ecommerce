import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',loadChildren: () => import('./shop/shop.module').then(x=>x.ShopModule)},
  {path:'account',loadChildren: () => import('./account/account.module').then(x=>x.AccountModule)},
  {path:'basket',loadChildren: () => import('./basket/basket.module').then(x=>x.BasketModule)},
  {path:'checkout',loadChildren: () => import('./checkout/checkout.module').then(x=>x.CheckoutModule)},
  {path:'order',loadChildren: () => import('./order/order.module').then(x=>x.OrderModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
