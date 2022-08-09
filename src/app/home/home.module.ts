import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

import { HomePageRoutingModule } from './home-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
