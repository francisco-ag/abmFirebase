import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';
import { doc } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestorageService } from '../services/firestorage.service';


@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

usuario={
email:"roberto@gmail.com",
password:"123456"
}

listaDeUsuarios = []

constructor(private database: DatabaseService,
            private alertController: AlertController,
            public firestorage: FirestorageService) {}

ngOnInit() {
this.database.getAll('usuarios').then(firebaseResponse =>{
firebaseResponse.subscribe(listaDeUsuariosRef => {
  
  this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef => {
    let usuario = usuarioRef.payload.doc.data();
    usuario['id'] = usuarioRef.payload.doc.id;

    return usuario;
  });
  console.log(this.listaDeUsuarios);
})

})
}

eliminar(id){
this.database.delete('usuarios',id).then(res=>{
this.presentAlert();
}).catch(error=>{
console.log("error al eliminar"+error)
})
}

async presentAlert() {
const alert = await this.alertController.create({
header: 'Alert',
message: 'Se elimino con éxito',
buttons: ['OK'],
});

await alert.present();
}


altaUsuario(){

this.database.create('usuarios',this.usuario).then(res=>{
console.log(res);
}).catch(err=>{
console.log("Error en alta : "+err);
});

}

modificar(){
let id= "pb01cZv6bwEVrIxho53A"; //aqui se debe ingresar el valor del id del usuario a modificar
this.database.update('usuarios',id,this.usuario).then(res=>{
alert("se modifico el usuario");
}).catch(err=>{
console.log("Error al modificar : "+err);
})
}

obtenerPorId(){
let id="pb01cZv6bwEVrIxho53A"  //Aqui se debe de ingresar el id a buscar
this.database.getbyId('usuarios', id).then(res=>{
res.subscribe(docRef=>{
  let usuario = docRef.data();
  usuario['id'] = docRef.id;
  console.log(usuario)
})
})
}

newImage=""

async newImageUpload(event: any){
  // if(event.target.files && event.target.files[0]){
  //   const reader = new FileReader();
  //   reader.onload = ((image) =>{
  //     this.newImage = image.target.result as string;

  //   });
  //   reader.readAsDataURL(event.target.files[0]); 
  // }

  const path = 'Fotos';
  const name = 'prueba2'
  const file =  event.target.files[0];
  const res =  await this.firestorage.uploadImage(file,path, name)
  console.log("recibi res de la promesa",res);
  console.log("Fin de la funcion => newImageUpload"); 

}

}

