import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'shop',loadChildren: () => import('./shop/shop.module').then(x=>x.ShopModule)},
  {path:'account',loadChildren: () => import('./account/account.module').then(x=>x.AccountModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
