import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {
@Input() place: any;
  constructor() { }

  ngOnInit() {
  }

}
