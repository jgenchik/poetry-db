import { computed, effect, Injectable, signal } from '@angular/core';
import { SearchByType } from '../types/search-by.type';
import { httpResource } from '@angular/common/http';
import { Poem } from '../types/poem.type';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {

  private searchBy = signal<SearchByType>('title');
  #searchBy: SearchByType = 'title';
  private serchCriteria = signal('');
  #playingTitle = signal('');
  playingTitle = this.#playingTitle.asReadonly();


  // private poetryResource = httpResource<Poem[]>(() => ({
  //   url: `https://poetrydb.org/${this.searchBy()}/${this.serchCriteria()}`
  // }),{
  //   defaultValue: []
  // });
  private poetryResource = httpResource<Poem[]>(() => ({
    url: `https://poetrydb.org/${this.#searchBy}/${this.serchCriteria()}`
  }),{
    defaultValue: []
  });

  poems = this.poetryResource.value.asReadonly();
  totalPoems = computed(() => this.poems().length);
  isLoading = this.poetryResource.isLoading;
  error = this.poetryResource.error;
  

  constructor() {
    effect(() => this.#searchBy = this.searchBy());
  }

  setSearchBy(searchBy: SearchByType) {
    this.searchBy.set(searchBy);
  }

  setSerchCriteria(serchCriteria: string) {
    this.serchCriteria.set(serchCriteria);
  }

  setPlayingTitle(title: string) {
    this.#playingTitle.set(title);
  }

}
