import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Poem } from '../types/poem.type';

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
export class PoemCardShortComponent {

  poem = input.required<Poem>();
  showAllPoem = model(false);

  read() {

    let text = this.cleanupText(this.poem().lines.join(';'));
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);

    // utterance = new SpeechSynthesisUtterance(this.poem().lines[1]);
    // speechSynthesis.speak(utterance);
  }

  cancel() {
    speechSynthesis.cancel();
  }

  private cleanupText(text: string) {
    let clean = text.replaceAll('-', '').replaceAll('_', '');
    return clean;
  }

}
