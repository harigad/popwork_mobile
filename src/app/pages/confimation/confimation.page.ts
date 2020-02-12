import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Events} from '@ionic/angular';
import {setToLocalStorage} from '../../../utils/local-storage';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.page.html',
  styleUrls: ['./confimation.page.scss'],
})
export class ConfimationPage implements OnInit {

  @ViewChild('a',{static:false}) pin1;

  public pinForm: FormGroup;
  public wrongPin = false;
  sentPin: any = '';
  public phone;
  public code;

  constructor(
      public authService: AuthService,
      public events: Events,
      private fb: FormBuilder,
      private  router: Router,
      private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.pin1.setFocus();

    this.pinForm = this.fb.group({
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],
      pin3: ['', Validators.required],
      pin4: ['', Validators.required]
    });
      console.log(this.activeRoute.params);
    this.activeRoute.queryParams.subscribe(params => {
      this.phone = params['phone'];
      this.code = params['code'];
      this.pinForm = this.fb.group({
        pin1: [this.code[0], Validators.required],
        pin2: [this.code[1], Validators.required],
        pin3: [this.code[2], Validators.required],
        pin4: [this.code[3], Validators.required]
      });
      console.log(params);
    });
  }

  sendPin() {
    this.wrongPin = false;
      const pin = this.pinForm.get('pin1').value + this.pinForm.get('pin2').
      value + this.pinForm.get('pin3').value + this.pinForm.get('pin4').value;
    if (pin !== this.sentPin) {
      this.sentPin = pin;
      this.authService.sendPin({pin: pin, phone: this.phone}).subscribe((res: any) => {
        setToLocalStorage('VB_USER', res);
        setTimeout(function () {
          this.events.publish('user:loggedin');
        }.bind(this), 300);
        this.router.navigate(['/settings']);
      }, error => {
        this.wrongPin = true;
        console.log(error);
      });
    }
  }

  moveFocus(currentelement, nextElement, move = true) {
    if (currentelement.value && move) {
      nextElement.setFocus();
    }

    if (this.pinForm.valid) {
      this.sendPin();
    }

  }

}
