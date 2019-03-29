import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {AuthService} from '../../../services/auth.service';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public messages = [];
  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getMessage().subscribe((mess: any ) => {
      console.log(mess);
      this.messages = mess;
    });
  }


}
