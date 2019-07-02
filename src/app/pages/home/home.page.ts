import {Component, NgZone, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {setToLocalStorage, getFromLocalStorage} from '../../../utils/local-storage';
import {CodePush, SyncStatus} from '@ionic-native/code-push/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public phone;
  progressStatus: string = '';
  public showProgress: boolean;
  public buttonDisabled: boolean;
  private status;
  constructor(
      public navCtrl: NavController,
      public authService: AuthService,
      private  router: Router,
      private iab: InAppBrowser,
      private acvtivRoute: ActivatedRoute,
      private  platform: Platform,
      private ngZone: NgZone,
      private codePush: CodePush,
  ) {

  }
  ngOnInit() {
    this.acvtivRoute.queryParams.subscribe(res => {
      if (res.token) {
        console.log(decodeURI(res.token ));
        const tok = decodeURI(res.token);
        setToLocalStorage('VB_USER', JSON.parse(tok + '"}}'));
        this.router.navigate(['/main']);
      }
    });

      this.codePush.sync({}, (progress) => {
        this.ngZone.run(() => {
          this.progressStatus = JSON.stringify(progress);
        });
      }).subscribe((status) => {
        this.status = status;
        if (status === SyncStatus.CHECKING_FOR_UPDATE) {
        }
        if (status === SyncStatus.DOWNLOADING_PACKAGE) {
          this.showInstall();
          this.disableButton();
        }
        if (status === SyncStatus.IN_PROGRESS) {
          this.showInstall();
          this.disableButton();
        }
        if (status === SyncStatus.INSTALLING_UPDATE) {
          this.showInstall();
          this.disableButton();
        }
        if (status === SyncStatus.UP_TO_DATE) {
          this.hideInstall();
          if (this.authService.isTokenValid()) {
            this.router.navigate(['/main']);
          }
        }
        if (status === SyncStatus.UPDATE_INSTALLED) {
          this.hideInstall();
          if (this.authService.isTokenValid()) {
            this.router.navigate(['/main']);
          }
        }
        if (status === SyncStatus.ERROR) {
        }
      });
    const userToken = getFromLocalStorage('VB_USER').jwt;
      if (userToken) {
        this.router.navigate(['/main']);
    }
  }
  showInstall() {
    this.showProgress = true;
  }
  hideInstall() {
    this.showProgress = false;
  }
  disableButton() {
    this.buttonDisabled = true;
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
    if (this.platform.is('cordova')) {
      const browser = this.iab.create(`https://popwork-dev-api.herokuapp.com/linkedin/login`, '_blank', {
        location: 'yes',
        zoom: 'no'
      });
      // alert('cordova');
      browser.on('loaderror').subscribe((event) => {
        if (event.url.includes('localhost')) {
          const tok = decodeURI(event.url.replace('http://localhost:8100/?token=', ''));
          setToLocalStorage('VB_USER', JSON.parse(tok));
          browser.close();
          this.ngZone.run(() => this.router.navigate(['/main'])).then();
        }
      });
      browser.on('loadstop').subscribe((event) => {
        if (event.url.includes('localhost')) {
          const tok = decodeURI(event.url.replace('http://localhost:8100/?token=', ''));
          setToLocalStorage('VB_USER', JSON.parse(tok));
          browser.close();
          this.ngZone.run(() => this.router.navigate(['/main'])).then();
        }
      });
    } else {
      const browser = this.iab.create(`https://popwork-dev-api.herokuapp.com/linkedin/login`, '_self', {
        location: 'yes',
        zoom: 'no'
      });
      browser.on('loadstop').subscribe((event) => {
        if (event.url.includes('localhost')) {
          const tok = decodeURI(event.url.replace('http://localhost:8100/?token=', ''));
          setToLocalStorage('VB_USER', JSON.parse(tok));
          browser.close();
          this.ngZone.run(() => this.router.navigate(['/main'])).then();
        }
      });
    }
  }


}

