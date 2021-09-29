import { ToastrService } from 'ngx-toastr';
import { BasketService } from './user/basket/basket.service';
import { AccountService } from './account/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'Client';

  constructor(private accountService:AccountService, private basketService:BasketService) {
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("token");
    if(token){
      this.accountService.loadCurrentUser(token).subscribe(
        ()=>{
        }
      );
    }
  }

  loadBasket(){
    let basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(
        () => {

        },err =>{
          console.log(err);
        }
      )
    }
  }

}
