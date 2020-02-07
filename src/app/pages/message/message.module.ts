import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagePage } from './message.page';
import { MessagesComponent } from '../../components/messages/messages.component';
import { MomentModule } from 'ngx-moment';

const routes: Routes = [
  {
    path: '',
    component: MessagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagePage, MessagesComponent],
  entryComponents: [],
})
export class MessagePageModule {}
