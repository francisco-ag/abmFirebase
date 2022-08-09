import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore :  AngularFirestore) { }

  async create (collection, dato){
    try{
      return await this.firestore.collection(collection).add(dato);
    }catch(error){
      console.log("Error agregando"+error);
    }
    
  }

  async getAll(collection){
    try{
      return await this.firestore.collection(collection).snapshotChanges();
    }catch(error){
      console.log("Error mostrando todos los datos "+ error);
    } 
  }

  async getbyId(collection, id){
    try{
      return await this.firestore.collection(collection).doc(id).get();
    }catch(error){
      console.log("Error mostrando datos "+ error);
    } 

  }

  /**
  async filtrarFecha(collection, fechainico:Date , fechaFinal: Date){
    try{
      date:Date
      if(date>=fechainico && date<=fechaFinal){
        return await this.firestore.collection(collection).doc(date).get();
      }


      
    }catch(error){
      console.log("Error mostrando datos "+ error);
    } 
  }

  **/


  async delete(collection, id){
    try{
      return await this.firestore.collection(collection).doc(id).delete();
    }catch(error){
      console.log("Error eliminando datos "+ error);
    } 
  }

  async update(collection, id, dato){
    try{
      return await this.firestore.collection(collection).doc(id).set(dato);
    }catch(error){
      console.log("Error actualizando datos "+ error);
    } 
  }




}
