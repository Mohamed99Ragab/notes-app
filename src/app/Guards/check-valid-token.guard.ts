import { NotesService } from './../services/notes.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckValidTokenGuard implements CanActivate {

  constructor(private _NotesService:NotesService ,private _Router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this._NotesService.getAllNotes().subscribe(res=>{
        if(res.message == "Token is Invalid"){
          this._Router.navigate(['/signin']);
          localStorage.removeItem('TOKEN');
          
        }
      });
      
    
      return true;
  }
  
}
