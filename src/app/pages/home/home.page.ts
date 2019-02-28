import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import {Router} from '@angular/router';

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
      private  router: Router
  ) { }

  onChange($event) {
    this.phone = $event || '';
    if (this.phone .replace(/\D/g, '').length === 10) {
      this.sendPhoneNumber();
    }
  }

  sendPhoneNumber() {
    this.authService.sendPhoneNumber({phone: this.phone}).subscribe((res: any) => {
      if (res && res.status) {
        this.router.navigate(['/settings', {phone: this.phone}]);
      }
    }, (error => {
      // TODO: remove next line after api is ready
      // this.navCtrl.push(SignupPage, {phone: this.phone});
        this.router.navigate(['/settings', {phone: this.phone}]);
      console.log(error);
    }));
  }

  ngOnInit() {
  }

}
