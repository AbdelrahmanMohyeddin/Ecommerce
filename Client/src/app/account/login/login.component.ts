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
  constructor(private service : AccountService) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm(){
    this.loginForm = new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    this.service.Login(this.loginForm.value).subscribe(
      ()=>{
        console.log("Success Login");
      },err=>{
        console.log(err);
      }
    );
  }

}
