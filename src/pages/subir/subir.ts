import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CargaArchivoProvider, ArchivoSubir } from '../../providers/carga-archivo/carga-archivo'


  

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imagenPreview:string = "";
  imagen64:string;

  constructor(private viewCtrl:ViewController
    , private camera: Camera
    , private imgpicker: ImagePicker
    , public _cargaArchivo:CargaArchivoProvider ) {
  }

  cerrarModal(){
    this.viewCtrl.dismiss();

  }

  mostrarCamara(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
      this.imagen64 =  imageData;
     }, (err) => {
       console.error("error al tomar la foto" + JSON.stringify(err))
      // Handle error
     });


  }

  crearPost(){


    let archivo:ArchivoSubir = { 
      img: this.imagen64
      , titulo : this.titulo
    };

    this._cargaArchivo.cargarImagenFirebase(archivo)
      .then(()=> this.cerrarModal());

  }

  seleccionarImagen(){

    let options: ImagePickerOptions = {
      quality: 70,
      outputType : 1,
      maximumImagesCount: 1

    }

    this.imgpicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);
      this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
      this.imagen64 = results[i];
      }
    }, (err) => { });
  }

  

}
