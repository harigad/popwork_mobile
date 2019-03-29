import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
      private router: Router,
  ) { }

  ngOnInit() {

  }

  pushMapPage() {
    this.router.navigate(['/map']);
  }
  pushMessagePage() {
    this.router.navigate(['/message']);
  }

  pushSettingsPage() {
    this.router.navigate(['/settings']);
  }

}
