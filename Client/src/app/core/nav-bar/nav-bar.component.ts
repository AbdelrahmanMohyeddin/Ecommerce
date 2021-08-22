import { IBasket } from './../../shared/models/basket';
import { BasketService } from './../../basket/basket.service';
import { AccountService } from './../../account/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser$:Observable<IUser | null>;
  basket$: Observable<IBasket | null>;
  constructor(private accountService:AccountService, private basketService:BasketService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.CurrentUser$;
    this.basket$ = this.basketService.basket$;
  }

  Logout(){
    this.accountService.Logout();
  }
}
