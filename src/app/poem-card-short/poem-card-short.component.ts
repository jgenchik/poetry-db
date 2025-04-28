import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, OnInit, output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Poem } from '../types/poem.type';
import { PoetryService } from '../services/poetry.service';

@Component({
  selector: 'app-poem-card-short',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  templateUrl: './poem-card-short.component.html',
  styleUrl: './poem-card-short.component.scss'
})
export class PoemCardShortComponent implements OnInit {

  poem = input.required<Poem>();
  showAllPoem = model(false);
  poemTooLong = computed(() => this.poem().lines.join(';').length  > 32767);

  playingTitle = input.required<string>();

  onPlay = output<Poem>();
  onCancel = output<void>();

  ngOnInit(): void {
    
  }

  read() {
    this.onPlay.emit(this.poem());
  }

  cancel() {
    this.onCancel.emit();
  }

}
