import { AccountService } from './../account/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  foundRoles:Boolean;
  constructor(private accountService:AccountService, private router:Router){
    this.foundRoles = false;
  }
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot)
    :Observable<boolean> {
      return this.accountService.CurrentUser$.pipe(
        map(account =>{
          if(account){
            account.role.forEach(role => {
              if(route.data.roles.includes(role)){
                this.foundRoles = true;
              }
            });
            if(route.data.roles && !this.foundRoles){
              this.router.navigate(['notAuthorized'])
              return false;
            }
            return true;
          }
          this.router.navigate(['account/login'],{queryParams:{returnUrl:state.url}})
        })
      )
  }
  
}
