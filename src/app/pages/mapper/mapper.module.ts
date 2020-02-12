import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapperPageRoutingModule } from './mapper-routing.module';

import { MapperPage } from './mapper.page';

import { MapperComponent } from './../../components/mapper/mapper/mapper.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { TableComponent } from './../../components/mapper/table/table.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapperPageRoutingModule,
    AngularDraggableModule
  
  ],
  declarations: [MapperPage,TableComponent,MapperComponent
  ]
})
export class MapperPageModule {}
