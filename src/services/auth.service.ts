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
export class AuthService {


    myLocation;
    public lat;
    public lng;

    constructor(
        private http: HttpClient
       
    ) {
        console.log("geo calling pre");
        if (this.getToken() !== '') {
           // this.connectSocket();
        }
       // this.positionInterval();
      
    }

    positionInterval() {
        setInterval(() => {
            this.getUserPosition();
        }, 30000);
    }

    refreshToken(){
        return this.http.post(appConfig.apiUrl + '/refresh',{});
    }

   
        async getUserPosition() {
            const coordinates = await Geolocation.getCurrentPosition();
            console.log('Current', coordinates);
            this.lat = coordinates.coords.altitude
            this.lng = coordinates.coords.longitude;
        };
    

    connectSocket() {
       
    }

    refreshPopWork(popwork){
        return this.http.get(appConfig.apiUrl + `/popworks/mobile/${popwork}`);
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

    setDeviceInfo(info) {
        return this.http.post(`${appConfig.apiUrl}/devices`, info);
    }

    isTokenValid() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const decoded = jwt_decode(token);
        if (decoded.exp === undefined) {
            return false;
        }
        const date = new Date(decoded.exp * 1000);
        return (date.valueOf() > new Date().valueOf());
    }

}
