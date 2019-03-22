import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
import {ContactComponent} from '../../components/contact/contact.component';
import {ComponentsModule} from '../../components/components.module';
import { ChartComponent } from '../../components/chart/chart.component';
import {CallComponent} from '../../components/call/call.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
    // BrowserModule
  ],
  entryComponents: [ContactComponent, ChartComponent, CallComponent],
  declarations: [SettingsPage, ContactComponent, ChartComponent, CallComponent]
})
export class SettingsPageModule {}
