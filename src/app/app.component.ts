import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAZyYJosTnoflkLXj97KFlRxrPwtMyngaY',
      authDomain: 'httpclientdemo-7098.firebaseapp.com',
      databaseURL: 'https://httpclientdemo-7098.firebaseio.com',
      projectId: 'httpclientdemo-7098',
      storageBucket: 'httpclientdemo-7098.appspot.com',
      messagingSenderId: '700168145861',
      appId: '1:700168145861:web:10ad4a64236bc4d18019ac',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
