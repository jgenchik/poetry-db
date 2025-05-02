import { Component, effect, ElementRef, inject, model, OnInit, viewChild } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SearchByType } from './types/search-by.type';
import { PoetryService } from './services/poetry.service';
import { PoemCardShortComponent } from "./poem-card-short/poem-card-short.component";
import { MatButtonModule } from '@angular/material/button';
import { PromptUpdateService } from './services/prompt-update.service';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { Poem } from './types/poem.type';
import { UsageStatsService } from './services/usage-stats.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    // RouterOutlet,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    PoemCardShortComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // https://github.com/thundercomb/poetrydb?tab=readme-ov-file#readme

  private readonly poetryService = inject(PoetryService);
  private readonly promptUpdateService = inject(PromptUpdateService);
  private readonly dialog = inject(MatDialog);
  private usageStatsService = inject(UsageStatsService);

  utterance = new SpeechSynthesisUtterance();
  
  searchBy = model<SearchByType>('title');
  serchCriteria = model('');
  serchCriteriaEl = viewChild.required<ElementRef<HTMLInputElement>>('serchCriteriaEl');

  poems = this.poetryService.poems;
  totalPoems = this.poetryService.totalPoems;
  isLoading = this.poetryService.isLoading;
  error = this.poetryService.error;
  playingTitle = this.poetryService.playingTitle;

  constructor() {
    effect(() => {
      this.serchCriteria.set('');
      this.poetryService.setSearchBy(this.searchBy());
      this.serchCriteriaEl().nativeElement.focus();
    });
    effect(() => this.poetryService.setSerchCriteria(this.serchCriteria()));
  }

  ngOnInit(): void {
    this.utterance.addEventListener('end', (event) => {
      // console.log('Utterence ended. Event: ', event);
      this.poetryService.setPlayingTitle('');
    });

    this.usageStatsService.addUsageStatistic('Opened app');
  }

  clearSearchCriteria() {
    this.serchCriteria.set('');
  }

  openInfoDialog(): void {
    this.usageStatsService.addUsageStatistic('Opened info dialog');
    this.dialog.open(InfoDialogComponent, {
      width: '600px',
    });
  }


  playPoem(poem: Poem) {
    this.usageStatsService.addUsageStatistic(`Play ${poem.title}`);

    this.poetryService.setPlayingTitle(poem.title);
    const text = this.cleanupText(poem.lines.join(';'));
    this.utterance.text = text;
    speechSynthesis.speak(this.utterance);
  }

  cancelPlay() {
    speechSynthesis.cancel();
    this.poetryService.setPlayingTitle('');
  }


  private cleanupText(text: string) {
    let clean = text.replaceAll('-', '').replaceAll('_', '');
    return clean;
  }

}
