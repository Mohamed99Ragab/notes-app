import { SignInComponent } from './../sign-in/sign-in.component';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  constructor(public _AuthService:AuthService,private _Router:Router) {
    

  }


  logout(){

    // this._AuthService.logout(localStorage.getItem('TOKEN')).subscribe(res=>{

    // });


 
    localStorage.removeItem('TOKEN');
    this._Router.navigate(['/signin']);

    
    
  }


}
