import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  closeModalCall() {
    this.modalCtrl.dismiss();
  }

}
