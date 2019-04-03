import {Component, NgZone, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {setToLocalStorage} from '../../../utils/local-storage';

import {log} from "util";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public phone;

  constructor(
      public navCtrl: NavController,
      public authService: AuthService,
      private  router: Router,
      private iab: InAppBrowser,
      private acvtivRoute: ActivatedRoute,
      private  platform: Platform,
      private ngZone: NgZone,
  ) {
  }

  onChange($event) {
    this.phone = $event || '';
    if (this.phone.replace(/\D/g, '').length === 10) {
      this.sendPhoneNumber();
    }
  }

  sendPhoneNumber() {
    console.log(this.phone);
    this.authService.sendPhoneNumber({phone: this.phone}).subscribe((res: any) => {
      if (res && res.status) {
        this.router.navigate(['/confimation'], {queryParams: {phone: this.phone, code: res.code}});
      }
    }, (error => {
      console.log(JSON.stringify(error));
    }));
  }

  openSystem() {
  const browser = this.iab.create(`https://popwork-dev-api.herokuapp.com/linkedin/login`, '_self', {
    location: 'no',
    zoom: 'no'
    });
    if (this.platform.is('cordova')) {
      browser.on('loadstop').subscribe((event) => {
        console.log('loadstop');
        console.log(JSON.stringify(event));
        if (event.url.includes('http://localhost:8100/?token=')) {
          const tok = decodeURI(event.url.replace('http://localhost:8100/?token=', ''));
          console.log(tok);
          setToLocalStorage('VB_USER', JSON.parse(tok));
          browser.close();
          this.ngZone.run(() => this.router.navigate(['/settings'])).then();
        }
      });
    }
  }

  ngOnInit() {
    this.acvtivRoute.queryParams.subscribe(res => {
      if (res.token) {
        console.log(decodeURI(res.token ));
        const tok = decodeURI(res.token);
        setToLocalStorage('VB_USER', JSON.parse(tok + '"}}'));
        this.router.navigate(['/settings']);
      }
    });

  }

}
