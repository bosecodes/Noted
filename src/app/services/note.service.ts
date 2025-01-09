import { Injectable } from '@angular/core';

export interface Note {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private nextId: number = 1;

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(note: Note): void {
    note.id = this.nextId++;
    this.notes.push(note);
  }

  editNote(updatedNote: Note): void {
    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
