import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {getFromLocalStorage} from '../../../utils/local-storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {
  public sendMessagePrivate: FormGroup = new FormGroup({});
  public messages: any = [];
  currentUserId;
  channelId;
  toUserId;
  public textPrivMess = [];
  private channelcreatedUser: any;

  constructor(
      private authService: AuthService,
      public activeRouter: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder
  ) {
    this.sendMessagePrivate = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.currentUserId = getFromLocalStorage('VB_USER').user.id;
    this.activeRouter.params.subscribe(params => {
      this.channelId = params.id;
      this.toUserId = params.id;
      this.authService.getMessagesById(this.channelId).subscribe( (mess: any) => {
        this.channelcreatedUser = mess[0].channel_created_user;
        if (mess[0].message) {
          this.messages = mess;
        }
        console.log(mess);
      });
    });
  }

  backToMessage() {
    this.router.navigate(['/message']).then();
  }
  send(message) {
    if (this.sendMessagePrivate.valid) {
      const data = {
        user: this.currentUserId,
        message: message.message,
        channel: this.channelId,
        popwork: 0
      };
      this.authService.sendMessage(data).subscribe( (mess: any) => {
        this.textPrivMess = mess;
        if ( mess.insertId) {
          this.messages.push({
            user: this.currentUserId,
            message: message.message,
            channel: this.channelId,
            popwork: 0
          });
        }
        console.log(this.textPrivMess);
        this.sendMessagePrivate.get('message').setValue('');
      });
    }
  }
}
