import { IAddress } from './../shared/models/address';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl + "account/";
  private CurrentUserSource = new BehaviorSubject<IUser | null>(null);
  CurrentUser$ = this.CurrentUserSource.asObservable();
  constructor(private http:HttpClient,private router : Router) { }


  loadCurrentUser(token:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl,{headers}).pipe(
      map((User:IUser)=>{
        if(User){
          localStorage.setItem("token",User.token);
          this.CurrentUserSource.next(User);
          console.log(User);
        }
      })
    );
  }

  Login(values:IUser){
    console.log("from service "+ values.email);
   return this.http.post<IUser>(this.baseUrl + "login" , values).pipe(
      map((user : IUser) => {
        if(user){
          localStorage.setItem("token",user.token);
          this.CurrentUserSource.next(user);
          this.loadCurrentUser(user.token);
        }
      })
    );
  }

  Register(values:any){
    return this.http.post<IUser>(this.baseUrl + "register",values).pipe(
      map((user:IUser) => {
        if(user){
          localStorage.setItem("token",user.token);
          console.log(user);
        }
      })
    );
  }

  Logout(){
    localStorage.removeItem("token");
    this.CurrentUserSource.next(null);
    this.router.navigateByUrl("/");
  }

  CheckEmailExist(email:string){
    return this.http.get(this.baseUrl + "emailexist?email=" + email);
  }

  getUserAddress(){
    return this.http.get<IAddress>(this.baseUrl + "address");
  }

  updateUserAddress(address:IAddress){
    return this.http.put<IAddress>(this.baseUrl + "address",address);
  }

}
