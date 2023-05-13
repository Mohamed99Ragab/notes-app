import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from './../../services/notes.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';

declare var $:any;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  myNotes:any;
  note_id:any;
  empty:any;
  constructor(private _NotesService:NotesService,private toastr:ToastrService,private _Router:Router) {
    
      this.allnNotes();
      
    
  
  }


  allnNotes(){

    this._NotesService.getAllNotes().subscribe((response)=>{


      
      if(response.status == true){

        this.myNotes = response.data;
        
      }else{
        this.empty = response.message;
      }

      
      
      

    })

  }

  addNoteForm = new FormGroup(
    {
      title:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required),
    }
  );


  addNote(){

    

    if(this.addNoteForm.valid){
        
      let object = {
        'note':this.addNoteForm.controls.title.value,
        'desc':this.addNoteForm.controls.desc.value,
      }


      this._NotesService.addNote(object).subscribe(response=>{
        
        if(response.status == true){


          this.toastr.success(response.message,'Notes');

          $('#addNote').modal('hide');

          this.allnNotes();
          
          this.addNoteForm.reset();
        }else{

          this.toastr.info(response.message,'Notes');
        }
        

      });

    }

  }


  getNoteId(id:any){

    this.note_id = id;
    
  }

  deleteNote(){

    this._NotesService.deleteNote(this.note_id).subscribe(response=>{
      
      if(response.status == true){
        $('#deleteNote').modal('hide');
        this.allnNotes();
       
        this.toastr.info('Note Deleted Success');
      }else
      {
        
        this.toastr.error(response.message);
      }
    });


  }


  editNoteForm = new FormGroup({
    title:new FormControl('',Validators.required),
    desc:new FormControl('',Validators.required)
  });




  setValue(){
   
      this._NotesService.viewNote(this.note_id).subscribe(res=>{
        
        
        if(res.status == true){

          this.editNoteForm.controls.title.setValue(res.data.note);
          this.editNoteForm.controls.desc.setValue(res.data.desc);
        }
      })
    

  }


  editNote()
  {

   
    let object = {
      'note':this.editNoteForm.controls.title.value,
      'desc':this.editNoteForm.controls.desc.value,
    }
    

    this._NotesService.editNote(object,this.note_id).subscribe(res=>{

      if(res.status == true){

        this.toastr.success(res.message);
        $('#editNote').modal('hide');
        this.allnNotes();
      }else{
        this.toastr.error(res.message);
      }
    })

  }


}
