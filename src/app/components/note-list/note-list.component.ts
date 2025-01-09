import { Component } from '@angular/core';
import { Note, NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  standalone: false,
  
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
    this.loadNotes();
  }

  loadNotes() : void {
    this.notes = this.noteService.getNotes();
  }

  onNoteAdded(note : Note): void {
    this.noteService.addNote(note);
    this.loadNotes();
  }

  onNoteDeleted(id: number): void {
    this.noteService.deleteNote(id);
  }
}
