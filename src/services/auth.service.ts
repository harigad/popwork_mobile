import { Injectable } from '@angular/core';
import {appConfig} from '../utils/app.config';
import {HttpClient} from '@angular/common/http';
import {getFromLocalStorage} from '../utils/local-storage';
import { HttpHeaders} from '@angular/common/http';
import { HttpParams} from '@angular/common/http';
import io from 'socket.io-client';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  socket: any;
  myLocation;
  public lat;
  public lng;

  constructor(
      private http: HttpClient,
      private geolocation: Geolocation
  ) {

      if (this.getToken() !== '') {
        this.connectSocket();
      }
    this.positionInterval();

  }

  positionInterval() {
    setInterval(() => {
      this.getUserPosition();
    }, 30000);
  }

  getUserPosition() {
    this.geolocation.getCurrentPosition().then(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });
  }

  connectSocket() {
    this.socket = io(appConfig.apiUrl, {
      query: {
        token: this.getToken(),
        lat: this.lat,
        lng: this.lng
      }
    });

    this.socket.on('connection', () => {
      setInterval(() => {
        this.socket.emit('position', {
          query: {
            token: this.getToken(),
            lat: this.lat,
            lng: this.lng
          }
        });
      }, 30000);
    });
  }

  sendPhoneNumber(phone) {
    return this.http.post(appConfig.apiUrl + `/login/mobile/${phone.phone.replace(/\D/g, '')}`, {});
  }

  sendPin(pin) {
    console.log(pin);
    return this.http.post(appConfig.apiUrl + `/login/verify/${pin.phone.replace(/\D/g, '')}/${pin.pin}`, {});
  }

  createPlaces(place) {
    console.log(place);
    const dataJson = JSON.stringify({
      name: place.name,
      address: place.address,
      city: place.city,
      state: place.state,
      zipcode: place.zipcode,
      lat: place.lat,
      lng: place.lng,
      googleid: place.googleid
    });
    const params = new HttpParams()
    // .set('name', place.name)
    // .set('address', place.address)
    // .set('city', place.city)
    // .set('state', place.state)
    // .set('zipcode', place.zipcode)
    // .set('lat', place.lat)
    // .set('lng', place.lng)
    // .set('googleid', place.googleid);
        .set('data', dataJson);
    return this.http.post(appConfig.apiUrl + `/places`, params, {});
  }

  getPlaces(lat, lng) {
    return this.http.get(`${appConfig.apiUrl}/popworks/${lat}/${lng}`);
  }

  searchPlace(lat, lng, searchTxt) {
    // return this.http.get(`${appConfig.apiUrl}/places/search/${e}`);
    return this.http.get(`${appConfig.apiUrl}/popworks/${lat}/${lng}/${searchTxt}`);
  }

  getToken() {
    return getFromLocalStorage('VB_USER') ? getFromLocalStorage('VB_USER').jwt : '';
  }

  saveForm(user) {
    const params = new HttpParams().set('data', JSON.stringify(user));
    return this.http.put(`${appConfig.apiUrl}/users`, params, {});
  }
  createChannels(channel) {
    return this.http.post(appConfig.apiUrl + `/channels`, channel);
  }
  getChannels(status) {
    return this.http.get(`${appConfig.apiUrl}/channels/${status}`);
  }
  getMessagesById(id) {
    return this.http.get(`${appConfig.apiUrl}/messages/${id}`);
  }
  // getPrivateMess() {
  //   return this.http.get(`${appConfig.apiUrl}/messages/private`);
  // }
  // getPrivateMessByUserId(id) {
  //   return this.http.get(`${appConfig.apiUrl}/messages/private/${id}`);
  // }
  sendMessage(data) {
    return this.http.post(`${appConfig.apiUrl}/messages`, data);
  }

  isTokenValid() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return false;
    const date = new Date(decoded.exp * 1000);
    return (date.valueOf() > new Date().valueOf());
  }

}
