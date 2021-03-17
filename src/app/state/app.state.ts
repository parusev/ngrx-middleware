import { Book } from '../book-list/books.model';

export interface InputState {
  inputValue: number,
  inputValueIsDisabled: boolean
};

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<string>;
  input: InputState;
}