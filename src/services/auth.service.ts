import { Injectable } from '@angular/core';
import {appConfig} from '../utils/app.config';
import {HttpClient} from '@angular/common/http';
import {getFromLocalStorage} from '../utils/local-storage';
import { HttpHeaders} from '@angular/common/http';
import { HttpParams} from '@angular/common/http';
import io from 'socket.io-client';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  socket:any;
  myLocation;
  lat;
  lng;

  constructor(
      private http: HttpClient,
      private geolocation: Geolocation
  ) {

      if(this.getToken() !== ''){
        this.connectSocket();
      }
    this.positionInterval();
    this.socket = io(appConfig.apiUrl);
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
      console.log(this.lat);
      console.log(this.lng);
    });
  }

  connectSocket(){
    this.socket = io(appConfig.apiUrl,{
      query: {
        token: this.getToken(),
        lat: this.lat,
        lng: this.lng
      }
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

  getPlaces() {
    return this.http.get(`${appConfig.apiUrl}/places`);
  }

  searchPlace(e) {
    return this.http.get(`${appConfig.apiUrl}/places/search/${e}`);
  }

  getToken() {
    return getFromLocalStorage('VB_USER') ? getFromLocalStorage('VB_USER').jwt : '';
  }

  saveForm(user) {
    const params = new HttpParams().set("data",JSON.stringify(user));
    return this.http.put(`${appConfig.apiUrl}/users`, params,{});

  }
  getMessage() {
    return this.http.get(`${appConfig.apiUrl}/messages`);
  }
}
