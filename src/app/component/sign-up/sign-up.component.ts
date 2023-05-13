import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';


declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  styleIsNotValid = {'background-color':'gray','border-color':'gray'}; 
  styleIsValid= {'background-color':'#17a2b8','border-color':'#17a2b8'};
  
  successMessage = "";
  errorMessage = "";
  isClicked = false;

    constructor(private _AuthService:AuthService,private toster:ToastrService)
    {
  
    }

  signUp = new FormGroup({
    first_name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    age: new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)])
    // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)

  });


  formData()
  {
    if(this.signUp.valid){
      // console.log(this.signUp);

      this.isClicked = true;
      this._AuthService.signUp(this.signUp.value).subscribe((response)=>{

          if(response.status==true){
            this.signUp.reset();


            this.successMessage = response.message;
            //to hide alert after 5s
            setInterval(()=>{
              this.successMessage = ""
            },5000)

            this.errorMessage = "";
            this.isClicked = false;
          }else
          {
            
            this,this.toster.warning(response.message);
            this.successMessage = "";
            this.isClicked = false;
            
          }
      });




    }
  }


  ngOnInit(){

    

    $('#signUp').particleground();

  }

}

