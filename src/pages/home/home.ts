import { Component } from '@angular/core';
import {  ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';

import { SocialSharing } from '@ionic-native/social-sharing';

import { CargaArchivoProvider } from  '../../providers/carga-archivo/carga-archivo';

import { ArchivoSubir  } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hasmore:boolean = true;

  
  constructor(public modalCtrl:ModalController
    , public _cas:CargaArchivoProvider
    , private socialSharing: SocialSharing
    ) {

      console.log(_cas.imagenes);
    //this.posts = afDB.list('post').valueChanges();
  }

  compartir(post:ArchivoSubir){
    //(message, image, url)
    this.socialSharing.shareViaFacebook(post.titulo, post.img, post.img).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  mostrarModal(){
    this.modalCtrl.create(SubirPage).present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this._cas.cargarImagenes().then(
      (hasmore:boolean)=> {
        console.log(hasmore);
        this.hasmore = hasmore;
        infiniteScroll.complete();
      }
    )

      
   
  }

}
