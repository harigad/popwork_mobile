import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {
@Input() place: any;
items:any = [
  {type:"table", left:"5",top:"5",width:"5",height:"10"},
  {type:"table", left:"5",top:"35",width:"5",height:"10"},
  {type:"table", left:"5",top:"55",width:"5",height:"10"},
  {type:"table", left:"5",top:"75",width:"5",height:"10"},

  {type:"table", left:"25",top:"5",width:"5",height:"10"},
  {type:"table", left:"35",top:"5",width:"5",height:"10"},
  {type:"table", left:"45",top:"5",width:"5",height:"10"},
  {type:"table", left:"55",top:"5",width:"5",height:"10"},
];
public backgroundImage: any;
  constructor() {
  }

  ngOnInit() {
    this.backgroundImage = 'https://consensusinc.com/wp-content/uploads/2016/10/OfficeInterior2.jpg';
  }

}
