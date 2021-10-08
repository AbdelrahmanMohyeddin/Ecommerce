import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from './../../../../services/product-service.service';
import { BasketService } from './../../../../user/basket/basket.service';
import { IProduct } from './../../../../shared/models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product:IProduct;
  constructor(private basketService : BasketService,
    private productService:ProductServiceService,
    private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }

  deleteProduct(product:IProduct){
    let result = confirm("are you sure delete " + product.name);
    if(result == true){
      this.productService.DeleteProduct(product.id).subscribe(
        res =>{
          this.toaster.success("Product has deleted");
          
        },err=>{
          this.toaster.warning("Faild deleting product");
        }
      )
    }
  }

}
