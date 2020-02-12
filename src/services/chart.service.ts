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
    return params.shift ?
        this.http.get(`${appConfig.apiUrl}/presence/2/${params.time}/${params.shift}`) :
        this.http.get(`${appConfig.apiUrl}/presence/2/${params.time}/0`);
  }

}
