import { ShopService } from './../shop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;

  constructor(private service:ShopService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.service.GetProduct(this.route.snapshot.params['id']).subscribe(
    res =>{
      this.product = res;
      console.log(this.product.name);
    },err=>{
      console.log(err);
    })
  }

}
