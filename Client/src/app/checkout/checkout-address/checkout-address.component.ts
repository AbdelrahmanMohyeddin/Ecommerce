import { IAddress } from './../../shared/models/address';
import { AccountService } from './../../account/account.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkOutForm : FormGroup
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  saveAddressAsDefault(){
    this.accountService.updateUserAddress(this.checkOutForm.get('addressForm')?.value).subscribe(
      (res:IAddress)=>{
        console.log(res);
      },err =>{
        console.log(err);
      }
    )
  }
}
