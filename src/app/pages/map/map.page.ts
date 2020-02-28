import {Component, ViewChild, OnInit} from '@angular/core';

declare var google: any;
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import {AddChannelComponent} from '../../components/add-channel/add-channel.component';
import {ModalController} from '@ionic/angular';
import {getFromLocalStorage, setToLocalStorage} from '../../../utils/local-storage';
 
@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    public objects: any;
    public places: any;
    public place: any;
    public selectedMarker: any;
    public showPlaceInfo;
    public north;
    public south;
    public west;
    public east;
    public lat;
    public lng;
    public time = null;
    public hour = 7;
    public displayHour = "8:00 AM";
    public day = 0;
    public onFocus:any = false;


    date: string;
    type: 'string';

    @ViewChild('gmap',{static:false}) gmapElement: any;
    myLocation;
    map: any;
    public user = [];
    public visitsForToday:any;

    constructor(
        private router: Router,
        private authService: AuthService,
        public modalController: ModalController
    ) {
        
        this.geofenceInit();

    }

    geofenceInit() {
        console.log("calling Geofence");
    }

    



    rangeChanged(){
        let hour:any;
        let am = " am";
        if(this.hour > 11  ) {
            am = "pm";
        }
        if(this.hour > 12){
            hour = "0" + (this.hour - 12);
        }else if(this.hour < 10){
            hour = "0" + this.hour;
        }else{
            hour = this.hour;
        }
        this.displayHour = hour + ":00" + am; 
    }

   

    getDisplayTime() {
        let t = this.hour;
        let am = "am";
        if(t > 11.5){
            am = "pm";
        }

    }

    ngOnInit() {
            this.initMap();
          }

    refreshPopWork(){
        this.authService.refreshPopWork(this.showPlaceInfo.id).subscribe((popwork) => {
            this.showPlaceInfo = popwork;
        });
    }

    searchPlaces(e) {
        clearTimeout(this.time);

        this.time = setTimeout(() => {
            this.authService.searchPlace(this.lat, this.lng, e.target.value).subscribe(place => {
                this.places = '';
                this.places = place;
                this.placeMarkers();
                this.showPlaceInfo = this.places[0];
                const center =  new google.maps.LatLng(this.places[0].lat-0.1, this.places[0].lng);
                this.map.setCenter(center);
            });
        }, 500);

    }

    async initMap() {
        debugger;
            const position = await Geolocation.getCurrentPosition();
    
           
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.authService.getPlaces(this.lat, this.lng).subscribe(places => {
                    this.places = places;
                    this.placeMarkers();
                });
                this.myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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
                    styles: [
                        {
                            'featureType': 'water',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#e9e9e9'
                                },
                                {
                                    'lightness': 17
                                }
                            ]
                        },
                        {
                            'featureType': 'landscape',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#f5f5f5'
                                },
                                {
                                    'lightness': 20
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'geometry.fill',
                            'stylers': [
                                {
                                    'color': '#ffffff'
                                },
                                {
                                    'lightness': 17
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'geometry.stroke',
                            'stylers': [
                                {
                                    'color': '#ffffff'
                                },
                                {
                                    'lightness': 29
                                },
                                {
                                    'weight': 0.2
                                }
                            ]
                        },
                        {
                            'featureType': 'road.arterial',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#ffffff'
                                },
                                {
                                    'lightness': 18
                                }
                            ]
                        },
                        {
                            'featureType': 'road.local',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#ffffff'
                                },
                                {
                                    'lightness': 16
                                }
                            ]
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#f5f5f5'
                                },
                                {
                                    'lightness': 21
                                }
                            ]
                        },
                        {
                            'featureType': 'poi.park',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#dedede'
                                },
                                {
                                    'lightness': 21
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.text.stroke',
                            'stylers': [
                                {
                                    'visibility': 'on'
                                },
                                {
                                    'color': '#ffffff'
                                },
                                {
                                    'lightness': 16
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.text.fill',
                            'stylers': [
                                {
                                    'saturation': 36
                                },
                                {
                                    'color': '#333333'
                                },
                                {
                                    'lightness': 40
                                }
                            ]
                        },
                        {
                            'elementType': 'labels.icon',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'transit',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'color': '#f2f2f2'
                                },
                                {
                                    'lightness': 19
                                }
                            ]
                        },
                        {
                            'featureType': 'administrative',
                            'elementType': 'geometry.fill',
                            'stylers': [
                                {
                                    'color': '#fefefe'
                                },
                                {
                                    'lightness': 20
                                }
                            ]
                        },
                        {
                            'featureType': 'administrative',
                            'elementType': 'geometry.stroke',
                            'stylers': [
                                {
                                    'color': '#fefefe'
                                },
                                {
                                    'lightness': 17
                                },
                                {
                                    'weight': 1.2
                                }
                            ]
                        }
                    ]
                });
            }

    placeMarkers() {
        // debugger;
        this.map = new google.maps.Map(this.gmapElement.nativeElement, {
            center: new google.maps.LatLng(32.7767, -96.7970),
            zoom: 10,
            mapTypeControl: false,
            streetViewControl: false,
            panControl: false,
            fullscreenControl: false,
            rotateControl: false,
            zoomControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                {
                    'featureType': 'all',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'saturation': 36
                        },
                        {
                            'color': '#333333'
                        },
                        {
                            'lightness': 40
                        }
                    ]
                },
                {
                    'featureType': 'all',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'visibility': 'on'
                        },
                        {
                            'color': '#ffffff'
                        },
                        {
                            'lightness': 16
                        }
                    ]
                },
                {
                    'featureType': 'all',
                    'elementType': 'labels.icon',
                    'stylers': [
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#fefefe'
                        },
                        {
                            'lightness': 20
                        }
                    ]
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#fefefe'
                        },
                        {
                            'lightness': 17
                        },
                        {
                            'weight': 1.2
                        }
                    ]
                },
                {
                    'featureType': 'landscape',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#f5f5f5'
                        },
                        {
                            'lightness': 20
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#f5f5f5'
                        },
                        {
                            'lightness': 21
                        }
                    ]
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#dedede'
                        },
                        {
                            'lightness': 21
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#d6d6d6'
                        },
                        {
                            'lightness': 17
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        },
                        {
                            'lightness': 29
                        },
                        {
                            'weight': 0.2
                        }
                    ]
                },
                {
                    'featureType': 'road.arterial',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        },
                        {
                            'lightness': 18
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'all',
                    'stylers': [
                        {
                            'visibility': 'on'
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#ffffff'
                        },
                        {
                            'lightness': 16
                        },
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'road.local',
                    'elementType': 'labels.text',
                    'stylers': [
                        {
                            'visibility': 'off'
                        }
                    ]
                },
                {
                    'featureType': 'transit',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#f2f2f2'
                        },
                        {
                            'lightness': 19
                        }
                    ]
                },
                {
                    'featureType': 'water',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#e9e9e9'
                        },
                        {
                            'lightness': 17
                        }
                    ]
                }
            ]
        });
        const markers = [];
        for (let i = 0; i < this.places.length; i++) {
            const pos = new google.maps.LatLng(this.places[i].lat, this.places[i].lng);
            let iconUrl = '../../assets/imgs/coffee-map-icon-trans.png';
            if (this.places[i].people === 0) {
                iconUrl = '../../assets/imgs/coffee-map-icon-trans.png';
            }
            if (this.places[i].poptype === 1) {
                if (this.places[i].people > 0) {
                    iconUrl = '../../assets/imgs/coworking-map-icon-trans.png';
                } else {
                    iconUrl = '../../assets/imgs/coworking-map-icon-trans.png';
                }
            }
            let labelText = this.places[i].people + '';
           // if (this.places[i].people === 0) {
                labelText = ' ';
            //}

            const place = this.places[i];
            const marker = new google.maps.Marker({
                position: pos,
                map: this.map,
                label: {text: labelText, color: 'white'},
                icon: {
                    scaledSize: new google.maps.Size(36, 45),
                    url: iconUrl,
                },
            });
            marker.addListener('click', function () {
                if (this.selectedMarker) {
                    this.selectedMarker.setAnimation(null);
                }
                this.selectedMarker = marker;
                this.selectedMarker.setAnimation(google.maps.Animation.BOUNCE);
               // this.map.panTo(new google.maps.LatLng(place.lat, place.lng));
            }.bind(this));

            markers[i] = marker;
            this.places[i].marker = marker;

            google.maps.event.addListener(markers[i], 'click', () => {
                this.showPlaceInfo = this.places.filter(item => item.id === markers[i].id)[0];
                debugger;
                delete this.showPlaceInfo.marker;
                setToLocalStorage("selectedPopWork",this.showPlaceInfo);
                console.log(this.showPlaceInfo);
            });
            
            google.maps.event.addListener(this.map, 'bounds_changed', () => {
                const strictBounds = this.map.getBounds();
                this.north = strictBounds.getNorthEast().lng();
                this.south = strictBounds.getNorthEast().lat();
                this.west = strictBounds.getSouthWest().lng();
                this.east = strictBounds.getSouthWest().lat();
            });
            markers[i]['id'] = this.places[i].id;
        }

    }

    async addChannelModal() {
        const modal = await this.modalController.create({
            component: AddChannelComponent,
            cssClass: 'modalChannel',
            componentProps: {
                north: this.north,
                south: this.south,
                west: this.west,
                east: this.east,
            }
        });
        return await modal.present();
    }

}
