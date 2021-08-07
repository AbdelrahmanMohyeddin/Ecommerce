import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent implements OnInit {
  @Input() pageNumber : number;
  @Input() pageSize : number;
  @Input() totalCount : number;
  constructor() { }

  ngOnInit(): void {
  }

  getNumberOfProductInPage(total:number, current:number){
    return (total < current ? total : current);
  }

}
