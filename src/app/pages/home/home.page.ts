import {Component, NgZone, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {appConfig} from './../../../utils/app.config';
import {setToLocalStorage, getFromLocalStorage} from '../../../utils/local-storage';
import { Plugins } from '@capacitor/core';



const { Browser } = Plugins;


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
  private showLoginBtn:any = false;
  constructor(
      public navCtrl: NavController,
      public authService: AuthService,
      private  router: Router,
      private acvtivRoute: ActivatedRoute,
      private  platform: Platform,
      private ngZone: NgZone,
  ) {

  }

  ngOnInit() {
   /* console.log("----------------------------------------");
    console.log((window as any).IonicCordova.deploy.getConfiguration()); // Property 
    console.log("----------------------------------------");
    console.log((window as any).IonicCordova.deploy.checkForUpdate());
    console.log("----------------------------------------");
    console.log((window as any).IonicCordova.deploy.getCurrentVersion());
    console.log("----------------------------------------");*/

    this.acvtivRoute.queryParams.subscribe(res => {
      debugger;
      if (res.token) {
        console.log(decodeURI(res.token ));
        const tok = decodeURI(res.token);
        setToLocalStorage('VB_USER', JSON.parse(tok + '"}}'));
        this.authService.refreshToken().subscribe(res => {
          setToLocalStorage('VB_USER', res);
          this.router.navigate(['/map']).then();
        });
      }else{ 
        this.authService.refreshToken().subscribe(res => {
          setToLocalStorage('VB_USER', res);
          this.router.navigate(['/map']).then();
        });
      }
    });
      
    const userToken = getFromLocalStorage('VB_USER').jwt;
      if (userToken) {
        this.router.navigate(['/map']).then();
      }else{
        this.showLoginBtn = true;
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
        this.router.navigate(['/confimation'], {queryParams: {phone: this.phone, code: res.code}}).then();
      }
    }, (error => {
      console.log(JSON.stringify(error));
    }));
  }

  async openSystem() {

   // console.log((window as any).location.href);

   
      Browser.addListener('browserPageLoaded',(event) => {
    debugger;
        if (event.url.includes('localhost')) {
          const tok = decodeURI(event.url.replace('http://localhost:8100/?token=', ''));
          setToLocalStorage('VB_USER', JSON.parse(tok));
          Browser.close();
          this.ngZone.run(() => this.router.navigate(['/map'])).then();
        }
      });

      const browser = await Browser.open({url: `https://popwork-dev-api.herokuapp.com/linkedin/login`});
      
      



  }


}

