import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubirPage } from '../pages/subir/subir';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// pipes
import { PipesModule } from '../pipes/pipes.module';

// Plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';

// Servicio
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';


export const firebaseConfig = {
  apiKey: "AIzaSyCRl7864PhEeIYplUzmLlNR7_BYhymobT4",
  authDomain: "ionicgag-12a47.firebaseapp.com",
  databaseURL: "https://ionicgag-12a47.firebaseio.com",
  projectId: "ionicgag-12a47",
  storageBucket: "ionicgag-12a47.appspot.com",
  messagingSenderId: "1098452038424"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage, SubirPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,  Camera, ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider, SocialSharing
  ]
})
export class AppModule {}
