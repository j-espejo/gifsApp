import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, ISearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'cJAwU92aHiU2XxULkOIo66mof6xEXfOW';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  // list of search
  private _history: string[] = [];

  public results: Gif[] = [];

  get history(): string[] {
    return [...this._history];
  }

  //constructor se ejecuta una unica vez, cuando el servicio es llamado
  constructor(private http: HttpClient) {
    //load localStorage
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    //resultados
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string): void {
    query = query.trim().toLocaleLowerCase();

    //si no existe en _history se inserta
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      //save localStorage
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());

    //Observable
    this.http
      .get<ISearchGifsResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
