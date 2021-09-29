import { NotAuthorizedComponent } from './shared/component/not-authorized/not-authorized.component';
import { AuthGuard } from './core/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const adminModule = () => import('./admin/admin.module').then(x=>x.AdminModule);
const userModule = () => import('./user/user.module').then(x=>x.UserModule);

const routes: Routes = [
  {path:'notAuthorized',component:NotAuthorizedComponent},
  {path:'admin',loadChildren:adminModule,data:{roles:["admin"]}},
  {path:'',loadChildren:userModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
