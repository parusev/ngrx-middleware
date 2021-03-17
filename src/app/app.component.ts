import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
 
import { selectBookCollection, selectBooks } from './state/books.selectors';
import {
  retrievedBookList,
  addBook,
  removeBook,
} from './state/books.actions';
import { GoogleBooksService } from './book-list/books.service';
import { tap } from 'rxjs/operators';
import { selectInputValue, selectInputValueIsDisabled } from './state/input.selectors';
import { StateMiddlewareService } from './services/state-middleware.service';
import { setInputValueIsDisabled } from './state/input.actions';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$ = this.store.pipe(
    select(selectBooks),
    tap((v) => console.log('selectBooks', v))
  );
  bookCollection$ = this.store.pipe(
    select(selectBookCollection),
    tap((v) => console.log('selectBookCollection', v))
  );
  inputValue$ = this.store.pipe(
    select(selectInputValue),
    tap((v) => console.log('selectInputValue', v))
  )
  inputValueIsDisabled$ = this.store.pipe(
    select(selectInputValueIsDisabled),
    tap((v) => console.log('selectInputValueIsDisabled', v))
  )

  userInputValue: number = 0;

  constructor(
    private booksService: GoogleBooksService,
    private store: Store,
    private stateMiddlewareService: StateMiddlewareService
  ) {}
 
  ngOnInit() {
    // this.booksService
    //   .getBooks()
    //   .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
    this.stateMiddlewareService.fetchBooks();
  }
 
  onAdd(bookId) {
    this.store.dispatch(addBook({ bookId }));
  }
 
  onRemove(bookId) {
    this.store.dispatch(removeBook({ bookId }));
  }

  onSave() {
    this.stateMiddlewareService.dispatchInputChange(+this.userInputValue);
  }

  onSetDisabled(event) {
    this.store.dispatch(setInputValueIsDisabled({inputValueIsDisabled: event.target.checked}));
  }
}