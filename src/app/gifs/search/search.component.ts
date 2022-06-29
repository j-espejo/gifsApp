import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  // Busca en html una referencia local #txtSearch
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  search() {
    const txtValue = this.txtSearch.nativeElement.value;

    if (txtValue.trim().length === 0) {
      return;
    }

    this.gifsService.searchGifs(txtValue);

    this.txtSearch.nativeElement.value = '';
  }
}
