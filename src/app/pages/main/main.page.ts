import {Component, OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;
const { Device } = Plugins;
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import { throws } from 'assert';

const { Toast } = Plugins;

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {


    public apns: any;
    public pushToken: any;
    public deviceInfo:any;


    constructor(
        private authService: AuthService,
        public router:Router
    ) { }

    

    async ngOnInit() {

        const device = await Device.getInfo();

        this.deviceInfo = {
        apns: true,
        pushToken: this.pushToken,
        deviceid: device.uuid,
        devicetype: device.platform,
        devicemaker: device.manufacturer,
        devicemodel: device.model,
        meta: ''
        };

       
            this.pushSetup();
     

       /* this.router.navigate(['/main/message']).then(
            () => {
              this.router.navigate(['/chat/1392']);
            }
          );*/
    }

    ionViewDidEnter(){
       
    }

    pushSetup() {

        PushNotifications.register();
     
            const options = {
                android: {},
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
            };

            PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

            PushNotifications.addListener('registration',(token: any)  => {
                console.log("-----------------------> PUSH TOKEN " + JSON.stringify(token));
                this.pushToken = token
             
                this.deviceInfo.pushToken = token;
                this.authService.setDeviceInfo(this.deviceInfo).subscribe((info) => {
                    console.log(info);
                });
            });

            PushNotifications.addListener('pushNotificationReceived', 
      (notification: any) => {
        this.show(notification);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: any) => {
        this.show(notification);
        
      }
    );   
        
    }

    async show(str) {
      console.log(JSON.stringify(str));
      await Toast.show({
        text: str.data.aps.alert,
        position: "top"
      });
    }

}
