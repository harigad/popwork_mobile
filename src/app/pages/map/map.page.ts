import {Component, ViewChild, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
declare var google: any;
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public places: any;
  @ViewChild('gmap') gmapElement: any;
  myLocation;
  map: any;
  sliderConfig: any = {};
  constructor(
      private platform: Platform,
      private router: Router,
      private authService: AuthService,
      private geolocation: Geolocation
  ) {
  }
  ngOnInit() {

    this.authService.getPlaces().subscribe(places => {
      this.places = places;
      this.placeMarkers();
    });
    this.sliderConfig = {
      // loop: true,
      spaceBetween: 15,
      slidesPerView: 1.2,
      centeredSlides: true
    };
    this.platform.ready();
    this.initMap();
  }

  searchPlaces(e) {
    if (e.target.value && e.target.value.length > 3) {
      this.authService.searchPlace(e.target.value).subscribe(place => {
        this.place = place;
      });
    }

  }
  getLocation(event) {
    const index = event.target.getActiveIndex().then(i => {
     const center =  new google.maps.LatLng(this.places[i].lat, this.places[i].lng);
      console.log(this.places[i]);
     this.map.panTo(center);
    });
  }

  initMap() {
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

  pushSettingsPage() {
    this.router.navigate(['/settings']);
  }

  private placeMarkers() {
     this.places.forEach((place, i) => {
       const marker = new google.maps.Marker({
         position: new google.maps.LatLng(place.lat, place.lng),
         map: this.map,
         icon: {
           scaledSize: new google.maps.Size(20, 20),
           url: '../../assets/imgs/icons-marker.png'
         },
       });
     });

  }
}
