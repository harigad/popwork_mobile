import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Platform} from '@ionic/angular';
declare var google: any;
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  myLocation;
  map: any;
  private placeForm: FormGroup;
  errorPlace = false;
  place: any = [];
  constructor(
      private modalCtrl: ModalController,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private platform: Platform,
      private geolocation: Geolocation
  ) {

    this.placeForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      googleid: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.platform.ready();
    this.initMapPlace();
  }

  searchPlaces(e) {
    if (e.target.value && e.target.value.length > 3) {
      this.authService.searchPlace(e.target.value).subscribe(place => {
        this.place = place;
      });
    }

  }
  initMapPlace() {
    console.log('Rendering the Map');

    if (this.geolocation) {

      console.log('Navigation ON');
      this.geolocation.getCurrentPosition().then(position => {
        this.myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
          center: this.myLocation,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          panControl: false,
          fullscreenControl: false,
          rotateControl: false,
          zoomControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{
            'featureType': 'all',
            'elementType': 'all',
            // 'stylers': [{'invert_lightness': true}, {'saturation': 10}, {'lightness': 30}, {'gamma': 0.5}, {'hue': '#435158'}]
          }]
        });

        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: this.map,
          icon: {
            scaledSize: new google.maps.Size(25, 25),
            url: '../../assets/imgs/map-marker.png'
          },
          // animation: google.maps.Animation.BOUNCE,
        });
      });

    } else {
      this.myLocation = new google.maps.LatLng(42, 42);
      console.log('Navigation OFF');
      this.map = new google.maps.Map(this.gmapElement.nativeElement, {
        center: this.myLocation,
        zoom: 12,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
          'featureType': 'all',
          'elementType': 'all',
          // 'stylers': [{'invert_lightness': true}, {'saturation': 10}, {'lightness': 30}, {'gamma': 0.5}, {'hue': '#435158'}]
        }]
      });

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(42, 42),
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
      });

    }
  }

  createPlaces() {
    if (this.placeForm.valid) {
      this.errorPlace = false;
      this.authService.createPlaces(this.placeForm.value).subscribe(place => {
        console.log(place);
        this.modalCtrl.dismiss();
      });
    } else {
      this.errorPlace = true;
    }
    // this.dataPlace = {
    //   name: this.placeForm.value.name,
    //   address: this.placeForm.value.address,
    //   city: this.placeForm.value.city,
    //   state: this.placeForm.value.state,
    //   zipcode: this.placeForm.value.zipcode,
    //   lat: this.placeForm.value. lat,
    //   lng: this.placeForm.value.lng,
    //   googleid: this.placeForm.value.googleid,
    // };
  }

  closeModalPlace() {
    this.modalCtrl.dismiss();
  }

}
