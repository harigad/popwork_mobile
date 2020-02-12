import { Component, Input,  AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {MapperService} from './../../../../services/mapper.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  @Input('table') table: any;
  @Input('selected') selected: any;
  @Input('passSelected') passSelected: any;
  @Input('updateTable') updateTable: any;
  @ViewChild("mytable",{static: false}) mytable: ElementRef;

  constructor(public mapperService:MapperService) { 

  }

  ngAfterViewInit() {
    console.log(this.selected);
  }

  onKeydown($e){
    console.log($e);
  }

  setSelected(){
    this.passSelected(this.table);
  }

  dragStopped(e){
    let table = JSON.parse(JSON.stringify(this.table));
    table.width = this.mytable.nativeElement.offsetWidth;
    table.height = this.mytable.nativeElement.offsetHeight;
    table.left = this.mytable.nativeElement.offsetLeft + e.x;
    table.top = this.mytable.nativeElement.offsetTop + e.y;
    debugger;
    this._updateTable(table);
  }

  _updateTable(table){
    console.log(table);
    table.popwork = 1;table.seats = 2;
    this.mapperService.set(table).subscribe((data:any) => {
      this.table.id = data.id;
    });
  }

  resizeStopped(e){
    this.dragStopped(e);
  }

}
