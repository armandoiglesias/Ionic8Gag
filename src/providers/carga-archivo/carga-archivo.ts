import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import * as firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';

/*
  Generated class for the CargaArchivoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CargaArchivoProvider {

  imagenes:ArchivoSubir[] = [];
  lastKey:string = "";

  constructor(public toastCtrl: ToastController, 
  public afb:AngularFireDatabase) {
    console.log('Hello CargaArchivoProvider Provider');
    this.cargarUltimoKey().subscribe(
      () => {
        this.cargarImagenes();
      });
  }

  public cargarImagenes(){
    return new Promise((resolve, reject)=> {
      this.afb.list('/post', ref => ref.limitToLast(3)
        .orderByKey()
        .endAt(this.lastKey)
      ).valueChanges()
      .subscribe(
        (posts:any) => {
          posts.pop();
          if(posts.length == 0){
            console.log("No Registro");
            resolve(false);
            return;
          }

          this.lastKey = posts[0].key;
          for(let i = posts.length -1; i > 0;i--){
            let post = posts[i];
            this.imagenes.push(post);
            resolve(true);
          }



        });
    });
    
  }

  private cargarUltimoKey(){
    return this.afb.list("/post", ref => 
      ref.orderByKey().limitToLast(1)
    ).valueChanges()
    .map((post:any) => {
      console.log(post);
      this.lastKey = post[0].key;
      this.imagenes.push(post[0]);
    });
  }

  cargarImagenFirebase(archivo:ArchivoSubir){

    let promesa = new Promise(
      (resolve, reject) =>{
        this.presentToast("Cargando...");

        let storageRef = firebase.storage().ref();
        let nombre:string = new Date().valueOf().toString();
        let uploadTask:firebase.storage.UploadTask = 
          storageRef.child(`img/${ nombre}`).putString( archivo.img , 'base64', { contentType : 'image/jpeg'} );

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, 
            () => {}, // Saber el %
            (error) => {
              //manejo de error
              this.presentToast("Error en la Carga de archivo " +  error  );
              reject();
            }, 
            () => {
              //Exito
              this.presentToast("Exito");

              let url = uploadTask.snapshot.downloadURL;
              this.crearPost(archivo.titulo, url, nombre );
              resolve();
            } 
          )



      });

      return promesa;

  }

  private crearPost( titulo:string, url:string, nombre:string ){
    let post:ArchivoSubir = { 
      img: url
      , titulo: titulo
      , key : nombre
    };

    console.log(JSON.stringify(post));
    //this.afb.list("posts").push(post); 

    this.afb.object(`/post/${ nombre }`).update(post);

    this.imagenes.push(post);



  }

  presentToast(mensaje:string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}

export interface ArchivoSubir{
  titulo:string;
  img: string;
  key?: string;
}
