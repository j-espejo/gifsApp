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
    query = query.trim().toLocaleLowerCase();

    //si no existe en _history se inserta
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
    }

    console.log(this._history);
  }
}
