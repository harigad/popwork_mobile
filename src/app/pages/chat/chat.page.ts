import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getFromLocalStorage} from '../../../utils/local-storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  public sendMessage: FormGroup = new FormGroup({});
  public messages: any = [];
  public  error = false;
  status = false;
  currentUserId;
  channelId;
  public textMess = [];
  constructor(private authService: AuthService,
              public activeRouter: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
  ) {
    this.sendMessage = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.currentUserId = getFromLocalStorage('VB_USER').user.id;
    this.activeRouter.params.subscribe(params => {
      const data = params.id;
      this.channelId = params.id;
      this.authService.getPublicMess(data).subscribe( mess => {

        this.messages = mess;
        console.log(mess);
      });
    });
  }

  backToMessage() {
    this.router.navigate(['/message']);
  }

  send(message) {
    if (this.sendMessage.valid) {
      const data = {
        message: message.message,
        channel: this.channelId,
      };
      this.authService.sendMessage(data).subscribe( (mess: any) => {
        this.textMess = mess;
        if ( mess.insertId) {
          this.messages.push({
            message: message.message,
            channel: this.channelId,
            fromuser: this.currentUserId
          });
        }
        console.log(this.textMess);
        this.sendMessage.get('message').setValue('');
      });
    }
  }
}
