import { Component, OnInit } from '@angular/core';
import { NavParams, Platform  } from '@ionic/angular';
import {ContactFieldType, Contacts, IContactFindOptions} from '@ionic-native/contacts';
import {ModalController} from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public arrayValue: any = [];
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
      private modalCtrl: ModalController,
      private sms: SMS
  ) { }


  ngOnInit() {
    this.search('');
  }
  onInputChange(event: any, val) {
    console.log(event);
    const index: number = this.arrayValue.indexOf(val);
    if (event.detail.checked === true) {
      this.arrayValue.push(val);
      this.arrayLength = this.arrayValue.length;
      this.show = true;
    } else {
      this.arrayValue.splice(index, 1);
      this.arrayLength = this.arrayValue.length;
      if (this.arrayLength === 0) {
        this.show = false;
      }
    }
  }
  inviteContact() {
    if (!this.arrayValue.length) {
      console.log('test');
    } else {
      console.log(this.arrayValue);
    }
    this.sms.send('0037477494799', 'Hello From Ionic');
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
