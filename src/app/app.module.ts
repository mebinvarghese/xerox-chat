import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {FormsModule} from '@angular/forms';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StorePage } from '../pages/store/store';
import { TabsPage } from '../pages/tabs/tabs';
import { PaymentFormComponent } from '../components/payment-form/payment-form';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StorePage,
    TabsPage,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StorePage,
    TabsPage,
    PaymentFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
