import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ConfimationPage } from './confimation.page';

const routes: Routes = [
  {
    path: '',
    component: ConfimationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ConfimationPage]
})
export class ConfimationPageModule {}
