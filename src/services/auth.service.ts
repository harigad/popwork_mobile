import { Injectable } from '@angular/core';
import {appConfig} from './../utils/app.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient
  ) { }

  sendPhoneNumber(phone) {
    console.log('submiting ' + appConfig.apiUrl + `/login/mobile/${phone.phone.replace(/\D/g, '')}`);
    return this.http.post(appConfig.apiUrl + `/login/mobile/${phone.phone.replace(/\D/g, '')}`, {});
  }
}
