import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import {PlaceInfoComponent} from '../../components/place-info/place-info.component';
import {AddChannelComponent} from '../../components/add-channel/add-channel.component';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapPage, PlaceInfoComponent, AddChannelComponent],
  entryComponents: [AddChannelComponent]
})
export class MapPageModule {}
