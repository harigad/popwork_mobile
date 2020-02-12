import { NgModule } from '@angular/core';
import {PlaceInfoComponent} from '../components/place-info/place-info.component';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [PlaceInfoComponent],
  entryComponents: [

  ],
  imports: [CommonModule,AngularDraggableModule],
  exports: [PlaceInfoComponent]
})
export class ComponentsModule {}
