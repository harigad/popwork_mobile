import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {
@Input() place: any;
public backgroundImage:any;
  constructor() { 
    
  }

  ngOnInit() {
    //using static image for now
    //eventually the below image should be taken from this.place.img;
    this.backgroundImage = "http://localhost:3001/popworks/4542.jpg";//this.place.img

  }

}
