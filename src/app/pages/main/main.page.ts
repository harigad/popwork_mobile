import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';
import {Device} from '@ionic-native/device/ngx';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
    constructor(
        private platform: Platform,
        private push: Push,
        private device: Device,
        private authService: AuthService,
    ) {
    }

    public apns: any;
    public pushToken: any;
    public deviceInfo = {
        apns: true,
        pushToken: this.pushToken,
        deviceid: this.device.uuid,
        devicetype: this.device.platform,
        devicemaker: this.device.manufacturer,
        devicemodel: this.device.model,
        meta: ''
    };

    ngOnInit() {
        this.platform.ready().then(() => {
            this.pushSetup();
        });
    }

    pushSetup() {
        if (this.platform.is('cordova')) {
            const options: PushOptions = {
                android: {},
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
            };

            const pushObject: PushObject = this.push.init(options);
            pushObject.on('notification').subscribe((notification: any) => {
                // alert(JSON.stringify(notification));
            });

            pushObject.on('registration').subscribe((registration: any) => {
                if (registration.registrationType !== 'APNS') {
                    this.apns = 0;
                } else {
                    this.apns = 1;
                }
                // this.apns = registration.registrationType === 'APNS';
                this.pushToken = registration.registrationId;
                // alert(this.pushToken);
                this.deviceInfo = {
                    apns: this.apns,
                    pushToken: this.pushToken,
                    deviceid: this.device.uuid,
                    devicetype: this.device.platform,
                    devicemaker: this.device.manufacturer,
                    devicemodel: this.device.model,
                    meta: ''
                };
                this.authService.setDeviceInfo(this.deviceInfo).subscribe((info) => {
                    console.log(info);
                });
            });

            pushObject.on('error').subscribe(error => {
                alert(JSON.stringify(error));
            });
        }
    }

}
