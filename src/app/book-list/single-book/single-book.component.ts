import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss'],
})
export class SingleBookComponent implements OnInit {
  book: Book;
  faBackward = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.route.snapshot.params.id;
    this._booksService.getOneBook(+id).then((book: Book) => {
      this.book = book;
    });
  }

  onBack(): void {
    this.router.navigate(['/books']);
  }
}
