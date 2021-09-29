import { CoreModule } from './../core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [UserComponent,],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    CoreModule
  ]
})
export class UserModule { }
