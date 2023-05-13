import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = "https://note-app.sonicar.tech/api/";

  // headersToken = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
  // });

  constructor(private _HttpClient:HttpClient) { }

  getAllNotes():Observable<any>
  {

    return this._HttpClient.get(this.baseUrl+'all-notes');

  }


  addNote(data:object):Observable<any>
  {

    return this._HttpClient.post(this.baseUrl+'add-note',data);

  }


  deleteNote(note_id:any):Observable<any>
  {

    return this._HttpClient.delete(this.baseUrl+'delete-note/'+note_id);

  }

  viewNote(note_id:any):Observable<any>
  {

    return this._HttpClient.get(this.baseUrl+'show-note/'+note_id);

  }

  editNote(data:any,note_id:any):Observable<any>
  {

    return this._HttpClient.put(this.baseUrl+'update-note/'+note_id,data);

  }


}
