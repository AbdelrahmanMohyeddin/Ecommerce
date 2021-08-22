import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  errors : string[];
  constructor(private service : AccountService,private router : Router) { }

  ngOnInit(): void {
    this.CreateForm();
    if(localStorage.getItem("token")){
      this.router.navigateByUrl("/");
    }
  }

  get f(){
    return this.loginForm.controls;
  }

  CreateForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
      ]),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    this.service.Login(this.loginForm.value).subscribe(
      ()=>{
        this.router.navigateByUrl("/");
      },err=>{
        console.log(err);
        this.errors = err.error;
      }
    );
  }

}
