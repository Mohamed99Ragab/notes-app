import { Injectable } from '@angular/core';

import {HttpClient , HttpHeaders} from '@angular/common/http'

import {BehaviorSubject, Observable, Subject, tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseUrl = "https://note-app.sonicar.tech/api/"
  userChange:Subject<any> =new Subject<any>()


  constructor(private _HttpClient:HttpClient) {


   }

  

  signUp(data:any):Observable<any>
  {

    return this._HttpClient.post(this.baseUrl+'signUp',data);
  }

  signIn(data:any):Observable<any>
  {
    const headersToken ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //  'Cache-Control': 'no-cache'
      })
    };
    

    return this._HttpClient.post(this.baseUrl+'signIn',data,headersToken);
    
  }

 


  logout(token:any):Observable<any>
  {
    
    // const headersToken = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });

    return this._HttpClient.post(this.baseUrl+'logout',null);
  }


    isLogedIn(){

      return localStorage.getItem('TOKEN')? true : false;
    
    }


    isGuest(){
      return !localStorage.getItem('TOKEN')?true:false;
    }

    getAuthToken():string|null {

      return localStorage.getItem('TOKEN')

      }



}
