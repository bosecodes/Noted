import { Component, OnInit } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-note-list',
  standalone: false,
  
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent implements OnInit{
  notes$: Observable<Note[]> | undefined;

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.notes$ = this.noteService.getNotes();
  }

  onNoteAdded(note : Note): void {
    this.noteService.addNote(note);
  }

  onNoteDeleted(id: number): void {
    this.noteService.deleteNote(id);
  }

  searchNotes(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.notes$ = this.noteService.searchNotes(inputValue);
  }
  

}
