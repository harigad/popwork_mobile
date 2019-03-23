import { Injectable } from '@angular/core';
import {appConfig} from '../utils/app.config';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
      private http: HttpClient
  ) { }

  getData(params) {
    return this.http.get(`${appConfig.apiUrl}/presence/2/${params.time}/${params.start}`);
  }

  prevData(params) {
    return this.http.get(`${appConfig.apiUrl}/presence/0/${params.time}/${params.start}/0`);
  }
  nextData(params) {
    return this.http.get(`${appConfig.apiUrl}/presence/1/${params.time}/${params.start}/1`);
  }
}
