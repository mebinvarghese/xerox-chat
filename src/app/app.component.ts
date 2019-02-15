import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

const config = {
  apiKey: 'AIzaSyBp8sAzEmGKWibjDX9Pw4U7Vh1MlFZFeJc',
  authDomain: 'task-f0f22.firebaseapp.com',
  databaseURL: 'https://task-f0f22.firebaseio.com/',
  projectId: 'task-f0f22',  
  storageBucket: 'gs://task-f0f22.appspot.com',
  // messagingSenderId :''
};  

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

