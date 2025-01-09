import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from '../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: false,
  
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  noteForm: FormGroup;

  @Output() noteAdded = new EventEmitter<Note>();

  constructor(private readonly fb: FormBuilder) {
    this.noteForm  = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  onSubmit(): void {
    if(this.noteForm.valid) {
      this.noteAdded.emit(this.noteForm.value);
      this.noteForm.reset();
    }
  }
}


