import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface Note {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesSubject = new BehaviorSubject<Note[]>([]);

  private nextId: number = 1;

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note): void {
    const currentNotes = this.notesSubject.getValue();
    note.id = this.nextId++;
    this.notesSubject.next([... currentNotes, note]);
  }

  // editNote(updatedNote: Note): void {
  //   const index = this.notes.findIndex(note => note.id === updatedNote.id);
  //   if (index !== -1) {
  //     this.notes[index] = updatedNote;
  //   }
  // }

  deleteNote(id: number): void {
    const currentNotes = this.notesSubject.getValue();
    const updatedNotes = currentNotes.filter(note => note.id !== id);
    this.notesSubject.next(updatedNotes);
  }

  // filter notes based on a search term 
  searchNotes(term: string): Observable<Note[]> {
    return this.getNotes().pipe(
      map((notes) =>
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(term.toLowerCase()) ||
            note.content.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
