import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { NotAuthorizedComponent } from '../shared/component/not-authorized/not-authorized.component';

const shopModul = () => import('./shop/shop.module').then(x=>x.ShopModule);
const accountModule = () => import('./../account/account.module').then(x=>x.AccountModule);
const basketModule = () => import('./basket/basket.module').then(x=>x.BasketModule);
const checkOutModule = () => import('./checkout/checkout.module').then(x=>x.CheckoutModule);
const orderModule = () => import('./order/order.module').then(x=>x.OrderModule);
const adminModule = () => import('./../admin/admin.module').then(x=>x.AdminModule);

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path:'',loadChildren: shopModul},
    {path:'shop',loadChildren: shopModul},
    {path:'account',loadChildren: accountModule},
    {path:'basket',loadChildren: basketModule},
    {path:'checkout',loadChildren: checkOutModule,canActivate:[AuthGuard],data:{roles:["user","admin"]}},
    {path:'order',loadChildren: orderModule},
    {path:'admin',loadChildren:adminModule,canActivate:[AuthGuard],data:{roles:["admin"]}}
  ]},
  {path:'notAuthorized',component:NotAuthorizedComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }
