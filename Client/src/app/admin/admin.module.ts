import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './../core/core.module';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [AdminComponent, CreateProductComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminModule { }
