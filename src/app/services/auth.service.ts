import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  constructor() {}

  createNewUSer(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signInUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  signOutUser(): void {
    firebase.auth().signOut();
  }
}
