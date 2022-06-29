import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // list of search
  private _history: string[] = [];

  get history(): string[] {
    return [...this._history];
  }

  searchGifs(query: string): void {
    this._history.unshift(query);
    console.log(this._history);
  }
}
