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
  lng1: any;
  lat1: any;
  lng2: any;
  lat2: any;
  lat;
  lng;

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
    this.platform.ready();
    this.initMap();
  }
  initMap() {
    if (this.geolocation) {
      const strictBounds = new google.maps.LatLngBounds();
      this.lng1 = strictBounds.getNorthEast().lng();
      this.lat1 = strictBounds.getNorthEast().lat();
      this.lng2 = strictBounds.getSouthWest().lng();
      this.lat2 = strictBounds.getSouthWest().lat();
      console.log(this.lng1, this.lat1, this.lng2, this.lat2);
    }
  }

  addChannel() {
    const channel = {
      title: this.channelForm.value.title,
      // lat: this.lat,
      // lng: this.lng
    };
    if (this.channelForm.valid) {
      this.authService.createChannels(channel).subscribe( res => {
        this.modalCtrl.dismiss();
      });
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
