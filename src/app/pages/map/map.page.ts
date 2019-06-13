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
  public  workPlaces = [];
  public objects: any;
  public places: any;
  public place: any;
  public showPlaceInfo;
  @ViewChild('gmap') gmapElement: any;
  myLocation;
  map: any;
  sliderConfig: any = {};
  public user = [];
  constructor(
      private platform: Platform,
      private router: Router,
      private authService: AuthService,
      private geolocation: Geolocation
  ) {
  }
  ngOnInit() {
    this.workPlaces = [
      {
        placeTitle: 'Atero',
        meters: '400',
        street: 'Shahumyan',
        city: 'Spitak',
        lat: '41.0060',
        lng: '44.3833',
        id: '1',
        user: [{
          jobTitle: 'Web Developer'
        },
        {
          jobTitle: 'Mobile Designer'
        }
        ],
      },
      {
        placeTitle: 'WeWork',
        meters: '500',
        street: 'Test Street1',
        city: 'Vanadzor',
        lat: '40.820180',
        lng: '44.485540',
        id: '2',
        user: [{
          jobTitle: 'Software Developer'
        },
          {
            jobTitle: 'Web Designer'
          }
        ],
      },
      {
        placeTitle: 'Test Place1',
        meters: '600',
        street: 'Test Street2',
        city: 'Test City1',
        lat: '40.793410',
        lng: '43.839280',
        id: '3',
        user: [{
          jobTitle: 'Seo'
        },
          {
            jobTitle: 'UX , Logos'
          }
        ],
      },
      {
        placeTitle: 'Test Place2',
        meters: '700',
        street: 'Test Street3',
        city: 'Test City2',
        lat: '40.173970',
        lng: '44.502750',
        id: '4',
        user: [{
          jobTitle: 'Mobile React Native Developer'
        },
          {
            jobTitle: 'Web Developer'
          }
        ],
      }
    ];

    // this.authService.getPlaces().subscribe(places => {
    //   this.places = places;
    //   this.placeMarkers();
    // });
      this.places = this.workPlaces;
    this.platform.ready();
    this.initMap();
    // this.placeMarkers();
  }

  searchPlaces(e) {
    if (e.target.value && e.target.value.length > 3) {
      this.authService.searchPlace(e.target.value).subscribe(place => {
        this.place = place;
      });
    }
  }
  initMap() {
    if (this.geolocation) {
      this.geolocation.getCurrentPosition().then(position => {
        // this.workPlaces.push({lat: position.coords.latitude, lng: position.coords.longitude});
        this.myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
          center: this.myLocation,
          zoom: 8,
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
        const markers = [];
        for (let i = 0; i < this.workPlaces.length; i++) {
          const pos = new google.maps.LatLng(this.workPlaces[i].lat, this.workPlaces[i].lng);
          markers[i] = new google.maps.Marker({
            position: pos,
            map: this.map,
            icon: {
              scaledSize: new google.maps.Size(50, 50),
              url: '../../assets/imgs/icons-marker.png',
            },
          });
          google.maps.event.addListener(markers[i], 'click', () => {
            this.showPlaceInfo = this.workPlaces.filter(item => item.id === markers[i].id )[0];
          });
          markers[i]['id'] = this.workPlaces[i].id;
          console.log(this.workPlaces[i]);
        }
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

  // private placeMarkers() {
  //   const markers = [];
  //   this.map = new google.maps.Map(this.gmapElement.nativeElement, {
  //     center: new google.maps.LatLng(42, 42),
  //     zoom: 14,
  //     mapTypeControl: false,
  //     streetViewControl: false,
  //     panControl: false,
  //     fullscreenControl: false,
  //     rotateControl: false,
  //     zoomControl: false,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     styles: [{
  //       'featureType': 'all',
  //       'elementType': 'all',
  //       // 'stylers': [{'invert_lightness': true}, {'saturation': 10}, {'lightness': 30}, {'gamma': 0.5}, {'hue': '#435158'}]
  //     }]
  //   });
  //   for (let i = 0; i < this.places.length; i++) {
  //     const pos = new google.maps.LatLng(this.places[i].lat, this.places[i].lng);
  //     markers[i] = new google.maps.Marker({
  //       position: pos,
  //       map: this.map,
  //       icon: {
  //         scaledSize: new google.maps.Size(20, 20),
  //         url: '../../assets/imgs/icons-marker.png'
  //       },
  //     });
  //     console.log(markers);
  //   }
  //
  // }

}
