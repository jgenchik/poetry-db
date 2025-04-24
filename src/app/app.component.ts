import { Component, effect, inject, model } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { SearchByType } from './types/search-by.type';
import { PoetryService } from './services/poetry.service';
import { PoemCardShortComponent } from "./poem-card-short/poem-card-short.component";
import { MatButtonModule } from '@angular/material/button';

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
    PoemCardShortComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // https://github.com/thundercomb/poetrydb?tab=readme-ov-file#readme

  private readonly poetryService = inject(PoetryService);
  
  searchBy = model<SearchByType>('title');
  serchCriteria = model('');

  poems = this.poetryService.poems;
  totalPoems = this.poetryService.totalPoems;
  isLoading = this.poetryService.isLoading;
  error = this.poetryService.error;

  constructor() {
    effect(() => {
      this.serchCriteria.set('');
      this.poetryService.setSearchBy(this.searchBy());
    });
    effect(() => this.poetryService.setSerchCriteria(this.serchCriteria()));
  }

  clearSearchCriteria() {
    this.serchCriteria.set('');
  }

}
