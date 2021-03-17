import { Injectable, OnDestroy } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { changeInputValue } from '../state/input.actions';
import { selectInputValueIsDisabled } from '../state/input.selectors';
import { GoogleBooksService } from '../book-list/books.service';
import { retrievedBookList } from '../state/books.actions';
import { Subject } from 'rxjs';


@Injectable()
export class StateMiddlewareService implements OnDestroy {
  destroy = new Subject();
  constructor(private store: Store, private booksService: GoogleBooksService) {}

  async dispatchInputChange(newValue: number) {
    if (newValue < 3) return;

    const inputValueIsDisabled = await this.store.pipe(
      select(selectInputValueIsDisabled),
      take(1)
    ).toPromise();

    if (inputValueIsDisabled) return;
    
    this.store.dispatch(changeInputValue({newValue}));
  }

  fetchBooks() {
    this.booksService
      .getBooks()
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe((Book) => this.store.dispatch(retrievedBookList({ Book })));
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}