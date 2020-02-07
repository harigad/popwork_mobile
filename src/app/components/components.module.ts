import { NgModule } from '@angular/core';
import {PlaceInfoComponent} from '../components/place-info/place-info.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [PlaceInfoComponent],
  entryComponents: [

  ],
  imports: [CommonModule],
  exports: [PlaceInfoComponent]
})
export class ComponentsModule {}
