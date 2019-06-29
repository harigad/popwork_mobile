import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ModalController} from '@ionic/angular';
import {getFromLocalStorage} from '../../../utils/local-storage';
import {AddChannelComponent} from '../../components/add-channel/add-channel.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(
  ) {
  }

  ngOnInit() {
  }

}
