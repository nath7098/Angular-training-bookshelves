import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  booksSub: Subscription;
  faMinus = faMinus;

  // tslint:disable-next-line: variable-name
  constructor(private _booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksSub = this._booksService.bookSub.subscribe((books: Book[]) => {
      this.books = books;
    });
    this._booksService.getBooks();
    this._booksService.emitBooks();
  }

  onNewBook(): void {
    this.router.navigate(['/books', 'new']);
  }

  onDelete(book: Book): void {
    this._booksService.removeBook(book);
  }

  onViewBook(id: number): void {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
