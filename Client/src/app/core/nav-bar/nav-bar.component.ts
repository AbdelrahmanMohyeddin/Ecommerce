import { IBasket } from './../../shared/models/basket';
import { BasketService } from './../../user/basket/basket.service';
import { AccountService } from './../../account/account.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser$:Observable<IUser | null>;
  basket$: Observable<IBasket | null>;
  windowScroll :number = 0;
  isAdmin:boolean;
  constructor(private accountService:AccountService, private basketService:BasketService) {
    this.currentUser$ = this.accountService.CurrentUser$;
    this.basket$ = this.basketService.basket$;
    this.currentUser$.subscribe(roles => this.isAdmin = roles?.role?.includes("admin"));
  }

  ngOnInit(): void {
    
  }

  Logout(){
    this.accountService.Logout();
  }

  // @HostListener('window:scroll', ['$event'])
  //   onScroll(event) {
  //       this.windowScroll = window.pageYOffset * -1 >= -50? -1 * window.pageYOffset : -51;
  //       document.getElementById('nav-container').style.transform = "translateY("+this.windowScroll+"px)";
  //       document.getElementById('nav-container').style.transition = "0.2s";
  //   }
}