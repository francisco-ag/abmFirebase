import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { resolve } from 'dns';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public storage: AngularFireStorage) { }

  uploadImage(file: any, path:string, nombre:string): Promise<string>{
    return new Promise ( resolve => {

      const filepath = path + '/' + nombre;
      const ref = this.storage.ref(filepath);
      const task = ref.put(file);

      task.snapshotChanges().pipe(
        finalize( () => {
            const downloadURL = ref.getDownloadURL();
        })
      )
      .subscribe();
       resolve('este es el enlace');

    }) ;
  }


}
