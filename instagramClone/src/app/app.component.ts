import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instagramClone';

  ngOnInit(){
    var firebaseConfig = {
      apiKey: "AIzaSyDPcWCInGp3GhYfxaiMTiIw-cRQDyuF6k4",
      authDomain: "instagramclone-7d4dd.firebaseapp.com",
      databaseURL: "https://instagramclone-7d4dd.firebaseio.com",
      projectId: "instagramclone-7d4dd",
      storageBucket: "instagramclone-7d4dd.appspot.com",
      messagingSenderId: "354349553047",
      appId: "1:354349553047:web:a601218a8415cce93a20d2"
    };

    firebase.initializeApp(firebaseConfig)
  }
}
