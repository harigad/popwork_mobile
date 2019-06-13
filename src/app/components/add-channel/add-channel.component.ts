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
  lat: any;
  lng: any;

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
    console.log('Rendering the Map');
    if (this.geolocation) {
      this.geolocation.getCurrentPosition().then(position => {
        this.lat = position.coords.latitude.toString();
        this.lng = position.coords.longitude.toString();
      });
    }

  }


  addChannel() {
    const channel = {
      title: this.channelForm.value.title,
      lat: this.lat,
      lng: this.lng
    };
    console.log(channel);
    if (this.channelForm.valid) {
      this.authService.createChannels(channel).subscribe( res => {
        this.modalCtrl.dismiss();
        console.log(res);
      });
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
