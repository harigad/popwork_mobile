import {Injectable} from '@angular/core';
import {appConfig} from '../utils/app.config';
import {HttpClient} from '@angular/common/http';
import {setToLocalStorage, getFromLocalStorage} from '../utils/local-storage';
import {HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class MapperService {


    constructor(
        private http: HttpClient
       
    ) {}

    set(table) {
        console.log("sending to server");
        return this.http.post(`${appConfig.apiUrl}/popworks/table/set`, table);
    }

    deleteTable(table) {
        return this.http.post(`${appConfig.apiUrl}/popworks/table/delete`, table);
    }

}
