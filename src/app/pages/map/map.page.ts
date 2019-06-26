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
    // this.workPlaces = [
    //   {
    //     placeTitle: 'Atero',
    //     meters: '400',
    //     street: 'Shahumyan',
    //     city: 'Spitak',
    //     lat: '41.0060',
    //     lng: '44.3833',
    //     id: '1',
    //     user: [{
    //       jobTitle: 'Web Developer'
    //     },
    //     {
    //       jobTitle: 'Mobile Designer'
    //     }
    //     ],
    //   },
    //   {
    //     placeTitle: 'WeWork',
    //     meters: '500',
    //     street: 'Test Street1',
    //     city: 'Vanadzor',
    //     lat: '40.820180',
    //     lng: '44.485540',
    //     id: '2',
    //     user: [{
    //       jobTitle: 'Software Developer'
    //     },
    //       {
    //         jobTitle: 'Web Designer'
    //       }
    //     ],
    //   },
    //   {
    //     placeTitle: 'Test Place1',
    //     meters: '600',
    //     street: 'Test Street2',
    //     city: 'Test City1',
    //     lat: '40.793410',
    //     lng: '43.839280',
    //     id: '3',
    //     user: [{
    //       jobTitle: 'Seo'
    //     },
    //       {
    //         jobTitle: 'UX , Logos'
    //       }
    //     ],
    //   },
    //   {
    //     placeTitle: 'Test Place2',
    //     meters: '700',
    //     street: 'Test Street3',
    //     city: 'Test City2',
    //     lat: '40.173970',
    //     lng: '44.502750',
    //     id: '4',
    //     user: [{
    //       jobTitle: 'Mobile React Native Developer'
    //     },
    //       {
    //         jobTitle: 'Web Developer'
    //       }
    //     ],
    //   }
    // ];


      // this.places = this.workPlaces;
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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.authService.getPlaces(lat, lng).subscribe(places => {
          this.places = places;
          this.placeMarkers();
          console.log();
        });
        console.log(lat, lng);
        this.myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        debugger;
        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
          center: this.myLocation,
          zoom: 1,
          mapTypeControl: false,
          streetViewControl: false,
          panControl: false,
          fullscreenControl: false,
          rotateControl: false,
          zoomControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles:[
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ]
        });
        const markers = [];
        // for (let i = 0; i < this.workPlaces.length; i++) {
        //   const pos = new google.maps.LatLng(this.workPlaces[i].lat, this.workPlaces[i].lng);
        //   markers[i] = new google.maps.Marker({
        //     position: pos,
        //     map: this.map,
        //     icon: {
        //       scaledSize: new google.maps.Size(50, 50),
        //       url: '../../assets/imgs/icons-marker.png',
        //     },
        //   });
        //   google.maps.event.addListener(markers[i], 'click', () => {
        //     this.showPlaceInfo = this.workPlaces.filter(item => item.id === markers[i].id )[0];
        //   });
        //   markers[i]['id'] = this.workPlaces[i].id;
        //   console.log(this.workPlaces[i]);
        // }
      });
    } else {
      this.myLocation = new google.maps.LatLng(42, 42);
      console.log('Navigation OFF');
      debugger;
      this.map = new google.maps.Map(this.gmapElement.nativeElement, {
        center: this.myLocation,
        zoom: 1,
        zoomControl: true,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#e9e9e9"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 17
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 29
                  },
                  {
                      "weight": 0.2
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 18
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f5f5f5"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#dedede"
                  },
                  {
                      "lightness": 21
                  }
              ]
          },
          {
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#ffffff"
                  },
                  {
                      "lightness": 16
                  }
              ]
          },
          {
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "saturation": 36
                  },
                  {
                      "color": "#333333"
                  },
                  {
                      "lightness": 40
                  }
              ]
          },
          {
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  },
                  {
                      "lightness": 19
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 20
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "color": "#fefefe"
                  },
                  {
                      "lightness": 17
                  },
                  {
                      "weight": 1.2
                  }
              ]
          }
      ]
      });

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(42, 42),
        map: this.map,
        animation: google.maps.Animation.BOUNCE,
      });

    }
  }

  private placeMarkers() {
    debugger;
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: new google.maps.LatLng(32.7767, -96.7970),
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      fullscreenControl: false,
      rotateControl: false,
      zoomControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles:  [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d6d6d6"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ]
    });
    const markers = [];
    for (let i = 0; i < this.places.length; i++) {
      const pos = new google.maps.LatLng(this.places[i].lat, this.places[i].lng);
      let iconUrl = "../../assets/imgs/coffee-map-icon.png";
      if(this.places[i].people == 0){
        iconUrl = "../../assets/imgs/coffee-map-icon-trans.png";
      }
      if(this.places[i].poptype == 1){
        if(this.places[i].people > 0){
          iconUrl = "../../assets/imgs/coworking-map-icon.png";
        }else{
          iconUrl = "../../assets/imgs/coworking-map-icon-trans.png";
        }
      }
     let labelText = this.places[i].people + "";
     if(this.places[i].people == 0){
        labelText = ' ';
     }
      markers[i] = new google.maps.Marker({
        position: pos,
        map: this.map,
        label: {text: labelText, color: "white"},
        icon: {
          scaledSize: new google.maps.Size(36, 45),
          url: iconUrl,
        },
      });
      google.maps.event.addListener(markers[i], 'click', () => {
        this.showPlaceInfo = this.places.filter(item => item.id === markers[i].id )[0];
        console.log(this.showPlaceInfo);
      });
      markers[i]['id'] = this.places[i].id;
      console.log(this.places[i]);
    }

  }

}
