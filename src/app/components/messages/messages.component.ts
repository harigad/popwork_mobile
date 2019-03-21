import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public messages = [];
  constructor() { }

  ngOnInit() {
    this.messages = [
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        'Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        ' Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            ' Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            ' Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            ' Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
      {
        name: 'Name',
        fname: 'Lastname',
        date: moment().startOf('hour').fromNow(),
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
            ' Ab amet animi atque autem consectetur debitis doloribus enim facere illo.'
      },
    ];

  }


}
