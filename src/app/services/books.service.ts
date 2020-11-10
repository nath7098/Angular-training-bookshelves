import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books: Book[] = [];
  bookSub = new Subject<Book[]>();

  constructor() {}

  emitBooks(): void {
    this.bookSub.next(this.books);
  }

  saveBooks(): void {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(): void {
    firebase
      .database()
      .ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getOneBook(id: number): Promise<Book> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/books/' + id)
        .once('value')
        .then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createNewBook(book: Book): void {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book): void {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef
        .delete()
        .then(() => {
          console.log('Photo supprimée !');
        })
        .catch((error) => {
          console.log('fichier non trouvé : ' + error);
        });
    }
    const index = this.books.findIndex((bookEl) => {
      if (bookEl === book) {
        return true;
      }
    });
    this.books.splice(index, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement...');
        },
        (error) => {
          console.log('Erreur de chargement : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}
