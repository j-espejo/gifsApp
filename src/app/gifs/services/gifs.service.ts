import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, ISearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'cJAwU92aHiU2XxULkOIo66mof6xEXfOW';

  // list of search
  private _history: string[] = [];

  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string): void {
    query = query.trim().toLocaleLowerCase();

    //si no existe en _history se inserta
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
    }
    //Observable
    this.http
      .get<ISearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=cJAwU92aHiU2XxULkOIo66mof6xEXfOW&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
      });
  }
}
