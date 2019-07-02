import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {
@Input() place: any;
public backgroundImage: any;
  constructor() {
  }

  ngOnInit() {
    this.backgroundImage = 'https://consensusinc.com/wp-content/uploads/2016/10/OfficeInterior2.jpg';

  }

}
