import { Injectable } from '@angular/core';
import {appConfig} from '../utils/app.config';
import {HttpClient} from '@angular/common/http';
import {getFromLocalStorage} from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient
  ) { }

  sendPhoneNumber(phone) {
    return this.http.post(appConfig.apiUrl + `/login/mobile/${phone.phone.replace(/\D/g, '')}`, {});
  }
  sendPin(pin) {
    console.log(pin);
    return this.http.post(appConfig.apiUrl + `/login/verify/${pin.phone.replace(/\D/g, '')}/${pin.pin}`, {});
  }

  getPlaces() {
    return this.http.get(`${appConfig.apiUrl}/places`);
  }

  getToken() {
    return getFromLocalStorage('VB_USER') ? getFromLocalStorage('VB_USER').token : '';
  }
}
