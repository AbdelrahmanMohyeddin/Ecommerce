import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidbar',
  templateUrl: './admin-sidbar.component.html',
  styleUrls: ['./admin-sidbar.component.scss']
})
export class AdminSidbarComponent implements OnInit {

  mobileNavActive = false;
  ButtonNave = "fa-bars"; 
  constructor() { }

  ngOnInit(): void {
  }

  mobileNaveToggle(){
    this.mobileNavActive = !this.mobileNavActive;
    if(this.ButtonNave == "fa-bars"){
      this.ButtonNave = "fa-times";
    }else{
      this.ButtonNave = "fa-bars";
    }
  }

  getActiveElement(){
    return localStorage.getItem('active');
  }

  addActive(element : string){
    localStorage.setItem('active',element);
  }

}
