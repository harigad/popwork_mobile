import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Push, PushObject, PushOptions} from '@ionic-native/push/ngx';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private push: Push
    ) {
        this.initializeApp();
        platform.ready().then(() => {
            this.pushSetup();
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    pushSetup() {
        if (this.platform.is('cordova')) {
            alert('adadadad');
            const options: PushOptions = {
                android: {
                    senderID: '1077854441864'
                },
                ios: {
                    alert: 'true',
                    badge: true,
                    sound: 'false'
                },
            };

            const pushObject: PushObject = this.push.init(options);
            pushObject.on('notification').subscribe((notification: any) => {
                alert(notification);
            });
            pushObject.on('registration').subscribe((registration: any) => {
                alert(registration);
            });
            pushObject.on('error').subscribe(error => {
                alert(error);
            });
        }
    }
}
