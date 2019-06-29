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
  fromUserId;
  toUserId;
  public textPrivMess = [];

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
      this.fromUserId = params.id;
      this.toUserId = params.id;
      this.authService.getPrivateMessByUserId(this.fromUserId).subscribe( (mess: any) => {
        this.messages = mess;
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
        message: message.message,
        touser: this.toUserId
      };
      this.authService.sendMessage(data).subscribe( (mess: any) => {
        this.textPrivMess = mess;
        if ( mess.insertId) {
          this.messages.push({
            message: message.message,
            touser: this.toUserId,
            fromuser: this.currentUserId
          });
        }
        console.log(this.textPrivMess);
        this.sendMessagePrivate.get('message').setValue('');
      });
    }
  }
}
