import {Component, ViewChild, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

declare var google: any;
import {Router} from '@angular/router';


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
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public objects: any;
  @ViewChild('gmap') gmapElement: any;
  myLocation;
  map: any;
  sliderConfig: any = {};

  constructor(
      private platform: Platform,
      private router: Router,
      private authServise: AuthService
  ) {
  }

  async ngOnInit() {

    this.getJson();
    this.sliderConfig = {
      loop: true,
      spaceBetween: 15,
      slidesPerView: 1.2,
      centeredSlides: true
    };
    await this.platform.ready();
    await this.initMap();
  }

  initMap() {
    console.log('Rendering the Map');

    if (navigator.geolocation) {

      console.log('Navigation ON');
      navigator.geolocation.getCurrentPosition(position => {
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

  getJson() {
    this.objects = [{
      title: 'Jypsy Lime Lounge 1',
      date1: '9:00 AM - 11:00 AM',
      date2: '3:00 PM - 10:00 PM',
      wifi: 'Free',
      info: 'Accessible Power Outlets',
      book: 'Book Library',
      phone: 'Phone Room',
      printer: 'Printer',
    },
      {
        title: 'Jypsy Lime Lounge 2',
        date1: '9:00 AM - 11:00 AM',
        date2: '3:00 PM - 10:00 PM',
        wifi: 'Free',
        info: 'Accessible Power Outlets',
        book: 'Book Library',
        phone: 'Phone Room',
        printer: 'Printer'
      },
      {
        title: 'Jypsy Lime Lounge 3',
        date1: '9:00 AM - 11:00 AM',
        date2: '3:00 PM - 10:00 PM',
        wifi: 'Free',
        info: 'Accessible Power Outlets',
        book: 'Book Library',
        phone: 'Phone Room',
        printer: 'Printer'
      }
    ];
    JSON.stringify(this.objects);
    console.log(this.objects);
    this.authServise.getPlaces().subscribe(places => {
      this.objects = places;
    })
  }

  pushSettingsPage() {
    this.router.navigate(['/settings']);
  }

}
