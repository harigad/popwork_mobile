import { Component, ViewChild, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
declare var google: any;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent implements OnInit {
  public channelForm: FormGroup = new FormGroup({});
  @ViewChild('gmap') gmapElement: any;
  myLocation;
  map: any;
  north;
  south;
  west;
  east;

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private authService: AuthService,
              private platform: Platform,
              private geolocation: Geolocation
              ) {
    this.channelForm = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(`${this.north} ${this.south} ${this.west} ${this.east}`);
    this.platform.ready();
    // this.initMap();
  }
  // initMap() {
  //   if (this.geolocation) {
  //     const strictBounds = new google.maps.LatLngBounds();
  //     this.lng1 = strictBounds.getNorthEast().lng();
  //     this.lat1 = strictBounds.getNorthEast().lat();
  //     this.lng2 = strictBounds.getSouthWest().lng();
  //     this.lat2 = strictBounds.getSouthWest().lat();
  //     console.log(this.lng1, this.lat1, this.lng2, this.lat2);
  //   }
  // }

  addChannel() {
    const channel = {
      title: this.channelForm.value.title,
      north: this.north,
      south: this.south,
      west: this.west,
      east: this.east,
    };
    if (this.channelForm.valid) {
      this.authService.createChannels(channel).subscribe( res => {
        this.modalCtrl.dismiss().then();
      });
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
