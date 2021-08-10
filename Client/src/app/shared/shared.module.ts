import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopHeaderComponent } from './component/shop-header/shop-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { ShopSearchComponent } from './component/shop-search/shop-search.component';

@NgModule({
  declarations: [ShopHeaderComponent, PagerComponent, ShopSearchComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    
  ],
  exports:[
    PaginationModule,
    ShopHeaderComponent,
    PagerComponent
  ]
})
export class SharedModule { }
