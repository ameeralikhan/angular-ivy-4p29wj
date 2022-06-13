import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText = 0;
  @Output() onSearch = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  search() {
    this.onSearch.emit(this.searchText);
  }

}
