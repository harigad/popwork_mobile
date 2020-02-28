import {Component, Input, OnInit} from '@angular/core';
import {MapperService} from './../../../services/mapper.service';
import {getUser, getFromLocalStorage} from '../../../utils/local-storage';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-place-info',
  templateUrl: './place-info.component.html',
  styleUrls: ['./place-info.component.scss']
})
export class PlaceInfoComponent implements OnInit {
@Input() place: any;
 user: any;
items:any = [];
public backgroundImage: any;
  constructor(public mapperService:MapperService,
  public alert:AlertController  
  ) {

    this.user = getUser();

  debugger;
   console.log("-->" +  (window as any).screen.width);
    
  }

  ngOnInit() {
    this.backgroundImage = 'https://consensusinc.com/wp-content/uploads/2016/10/OfficeInterior2.jpg';
    let items = JSON.parse(this.place.cached || '[]');
    let width = (window as any).screen.width;
    let height = width/2;
    console.log(items);
    for(let i=0;i<items.length;i++){
      items[i].width = items[i].width * width;
      items[i].height = items[i].height * height;
      items[i].lft = items[i].lft * width;
      items[i].top = items[i].top * height;
    }0

    console.log(items);
    this.items = items;
  }

 async selectTable(table:any) {

    const alert = await this.alert.create({
      header: 'Reserve Seat!',
      message: 'Reserve me a seat at this table?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Not Sure Yet!');
          }
        }, {
          text: 'Yes Please!',
          handler: () => {
            console.log('Yes Reserves Please!');
          }
        }
      ]
    });

    await alert.present();





    this.mapperService.visit(table).subscribe((data) => {

    });
  }

}
