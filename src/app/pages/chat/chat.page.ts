import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getFromLocalStorage} from '../../../utils/local-storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  {
  public sendMessage: FormGroup = new FormGroup({});
  public messages: any = [];
  public mess: any = {};
  public error = false;
  status = false;
  currentUserId;
  channelId;
  public textMess = [];
  channelcreatedUser: any;

  constructor(private authService: AuthService,
              public activeRouter: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private navCtrl: NavController
  ) {
    this.sendMessage = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  ionViewDidEnter() {

    this.currentUserId = getFromLocalStorage('VB_USER').user.id;
 
    this.activeRouter.params.subscribe(params => {

      this.mess = JSON.parse(params.data);
      const data = params.id;
      this.channelId = params.id;
      this.authService.getMessagesById(data).subscribe((mess: any) => {
        this.channelcreatedUser = mess[0].channel_created_user;
        if (mess[0].message) {
          this.messages = mess;
        }
        console.log(mess);
      });
    });
  }

  backToMessage() {
    this.navCtrl.back();
  }

  send(message) {
    if (this.sendMessage.valid) {
      const data = {
        user: this.currentUserId,
        message: message.message,
        channel: this.channelId,
        popwork: 0
      };
      this.authService.sendMessage(data).subscribe((mess: any) => {
        this.textMess = mess;
        if (mess.insertId) {
          this.messages.push({
            message: message.message,
            channel: this.channelId,
            user: this.currentUserId
          });
        }
        console.log(this.textMess);
        this.sendMessage.get('message').setValue('');
      });
    }
  }



}
