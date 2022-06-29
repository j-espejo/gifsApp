import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  // Busca en html una referencia local #txtSearch
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  search() {
    const txtValue = this.txtSearch.nativeElement.value;
    console.log(txtValue);

    this.txtSearch.nativeElement.value = '';
  }
}
