import { IProduct } from 'src/app/shared/models/product';
import { ProductServiceService } from './../../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  product:IProduct;
  constructor(private actRoute:ActivatedRoute, private productService:ProductServiceService) { 
    
    let id = this.actRoute.snapshot.params.id;
    this.productService.GetProduct(id).subscribe(
      res=>{
        this.product = res;
      },err=>{
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    
  }

}
