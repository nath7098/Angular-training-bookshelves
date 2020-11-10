import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isFileUploading = false;
  isFileUploaded = false;
  fileUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: variable-name
    private _booksService: BooksService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSaveBook(): void {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const newBook = new Book(title, author);

    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this._booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File): void {
    this.isFileUploading = true;
    this._booksService.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.isFileUploading = false;
      this.isFileUploaded = true;
      this.toastr.success('Fichier chargé 😀 !', 'Great !', { timeOut: 3000 });
    });
  }

  detectFiles(event: any): void {
    this.onUploadFile(event.target.files[0]);
  }
}
