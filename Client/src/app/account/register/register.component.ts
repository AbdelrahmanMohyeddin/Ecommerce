import { AccountService } from './../account.service';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  errors : string[]
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email:new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        ],[this.validateEmailNotTaken()]),
      displayName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      password:new FormControl('',Validators.required),
    });
  }

  onSubmit(){
    this.accountService.Register(this.registerForm.value).subscribe(
      () => {
        console.log("Success Register");
      },(err:any) =>{
        console.log(err);
        this.errors = err.error;
      }
    );
  }

  validateEmailNotTaken(): AsyncValidatorFn{
    return control => {
      return timer(500).pipe( switchMap(() => {
        if(!control.value){ return of(null); }
        return this.accountService.CheckEmailExist(control.value).pipe(
          map(res =>{
            return res ? {emailExists:true} : null;
          })
        )
      })
      )
    }
  }

}
