import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, model, OnInit } from '@angular/core';
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

  private readonly poetryService = inject(PoetryService);

  poem = input.required<Poem>();
  showAllPoem = model(false);
  poemText = computed(() => this.cleanupText(this.poem().lines.join(';')));
  poemTooLong = computed(() => this.poemText().length > 32767);

  playingTitle = input.required<string>();
  utterance = new SpeechSynthesisUtterance();

  ngOnInit(): void {
    this.utterance.addEventListener('end', (event) => {
      // console.log('Utterence ended. Event: ', event);
      this.poetryService.setPlayingTitle('');
    });
    
  }

  read() {
    this.poetryService.setPlayingTitle(this.poem().title);

    this.utterance.text = this.poemText();
    speechSynthesis.speak(this.utterance);

    // console.log(' ***', this.poem().title, ' text length: ', this.poemText().length);
  }

  cancel() {
    speechSynthesis.cancel();
    this.poetryService.setPlayingTitle('');
  }

  private cleanupText(text: string) {
    let clean = text.replaceAll('-', '').replaceAll('_', '');
    return clean;
  }

}
