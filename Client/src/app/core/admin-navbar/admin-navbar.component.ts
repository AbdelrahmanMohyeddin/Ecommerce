import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IUser } from 'src/app/shared/models/user';
import { BasketService } from 'src/app/user/basket/basket.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  currentUser$:Observable<IUser | null>;
  windowScroll :number = 0;
  constructor(private accountService:AccountService, private basketService:BasketService) {
    
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.CurrentUser$;
  }

  Logout(){
    this.accountService.Logout();
  }
}
