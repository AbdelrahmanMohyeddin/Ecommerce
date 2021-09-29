import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminSidbarComponent } from './admin-sidbar/admin-sidbar.component';



@NgModule({
  declarations: [
    NavBarComponent,
    AdminNavbarComponent,
    AdminSidbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    AdminNavbarComponent,
    AdminSidbarComponent
  ]
})
export class CoreModule { }
