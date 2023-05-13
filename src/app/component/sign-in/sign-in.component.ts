import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { ToastrService } from 'ngx-toastr';
import { Subject, tap } from 'rxjs';

declare var $:any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {


  isClicked = false;



  constructor(private _AuthService:AuthService,private _Router:Router,private toster:ToastrService){

  }

  signIn = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])

  });


  formData()
  {
    if(this.signIn.valid){
      this.isClicked = true;
      

      this._AuthService.signIn(this.signIn.value).subscribe((response)=>{
        // console.log(response);
        if(response.status==true){
          
          localStorage.setItem('TOKEN',response.data.token);
          this._Router.navigate(['/myprofile']);

          this.isClicked = false;
          this.toster.success(response.message);
        }
        else{
          this.isClicked = false;
          this.toster.error(response.message);
        }
      })



    }
  }



  ngOnInit(){

    

    $('#signIn').particleground();

  }


}
