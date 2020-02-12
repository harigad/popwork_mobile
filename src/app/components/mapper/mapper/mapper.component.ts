import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.css']
})
export class MapperComponent implements OnInit {

  tables:any = [ ];
  gridSize = 10;
  selected:any = null;

  XX = [];
  YY = [];

  constructor() {

    for(let i=0;i<1100;i=i+10){
      this.XX.push(i);
    }

    for(let i=0;i<600;i=i+10){
      this.YY.push(i);
    }

  }

  updateTable(table){
    
  }

  setSelected(table){
    debugger;
    console.log("setSelected");
    this.selected = table;
  }

  ngOnInit() {
  }

  addTable(width,height,left=0,top=0){

    if(this.selected){

      width = this.selected? this.selected.width : width;
      height = this.selected? this.selected.height : height;

      left = left;// - width/2;
      top = top;// - height/2;

       left = (this.selected &&  (Math.abs(this.selected.left - left) > Math.abs(this.selected.top - top)) )? left: this.selected.left;
       top = (this.selected &&  (Math.abs(this.selected.left - left) > Math.abs(this.selected.top - top)) )? this.selected.top:top;

    }


    this.tables.push({
      width:width,
      height:height,
      left:left,
      top:top
    });
    this.selected = this.tables[this.tables.length-1];
  }

  addTableFromClick(e){
    console.log(e);
    this.addTable(60,60,e.layerX,e.layerY);
  }

}
