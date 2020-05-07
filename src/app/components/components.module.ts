import { NgModule } from '@angular/core';
import {PlaceInfoComponent} from '../components/place-info/place-info.component';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [PlaceInfoComponent],
  entryComponents: [

  ],
  imports: [CommonModule,AngularDraggableModule],
  exports: [PlaceInfoComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
