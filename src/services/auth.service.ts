import { Injectable } from '@angular/core';
import {appConfig} from '../utils/app.config';
import {HttpClient} from '@angular/common/http';
import {getFromLocalStorage} from '../utils/local-storage';
import { HttpHeaders} from '@angular/common/http';
import { HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient
  ) {
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
    return this.http.put(`${appConfig.apiUrl}/users`, user);

  }
  getMessage() {
    return this.http.get(`${appConfig.apiUrl}/messages`);
  }
}
