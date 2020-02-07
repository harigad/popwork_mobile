import { Component, OnInit } from '@angular/core';
import { NavParams, Platform  } from '@ionic/angular';
import {ContactFieldType, Contacts, IContactFindOptions} from '@ionic-native/contacts';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public selectedNumbers: any = [];
  public arrayLength;
  ourtype: ContactFieldType[] = ['displayName'];
  contactsFound = [];
  public show = false;
  searchContact: any = [];
  contact: any[];
  public check;
  checked: boolean;
  public loading = false;

  constructor(
      params: NavParams,
      private contacts: Contacts,
      private  platform: Platform,
      private modalCtrl: ModalController
  ) { }


  ngOnInit() {
    this.search('');
  }
  onInputChange(event: any, val) {
    console.log(event);
    const index: number = this.selectedNumbers.indexOf(val);
    if (event.detail.checked === true) {
      this.selectedNumbers.push(val);
      this.arrayLength = this.selectedNumbers.length;
      this.show = true;
    } else {
      this.selectedNumbers.splice(index, 1);
      this.arrayLength = this.selectedNumbers.length;
      if (this.arrayLength === 0) {
        this.show = false;
      }
    }
  }
  inviteContact() {
    if (!this.selectedNumbers.length) {
    } else {
    /*  this.sms.send(this.selectedNumbers, 'Hello From Ionic').then( e => {
            console.log('sent');
            console.log(e);
        this.modalCtrl.dismiss();
          }
      );*/
    }
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  search(q) {
    const option: IContactFindOptions = {
      filter: q
    };
    if (this.platform.is('cordova')) {
      this.loading = true;
      this.contacts.find(this.ourtype, option).then(conts => {
        this.loading = false;
        this.contactsFound = conts;
        this.searchContact = this.contactsFound;
        console.log(this.contactsFound);
      });
    }
  }
  searchContacts(e) {
    this.searchContact = this.contactsFound;
    this.searchContact = this.contactsFound.filter(contact => {
      console.log(contact);
      return contact.displayName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
  }

}
