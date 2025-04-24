import { computed, Injectable, signal } from '@angular/core';
import { SearchByType } from '../types/search-by.type';
import { httpResource } from '@angular/common/http';
import { Poem } from '../types/poem.type';

@Injectable({
  providedIn: 'root'
})
export class PoetryService {

  private searchBy = signal<SearchByType>('title');
  private serchCriteria = signal('');

  private poetryResource = httpResource<Poem[]>(() => ({
    url: `https://poetrydb.org/${this.searchBy()}/${this.serchCriteria()}`
  }),{
    defaultValue: []
  });

  poems = this.poetryResource.value.asReadonly();
  totalPoems = computed(() => this.poems().length);
  isLoading = this.poetryResource.isLoading;
  error = this.poetryResource.error;
  

  constructor() { }

  setSearchBy(searchBy: SearchByType) {
    this.searchBy.set(searchBy);
  }

  setSerchCriteria(serchCriteria: string) {
    this.serchCriteria.set(serchCriteria);
  }


}
