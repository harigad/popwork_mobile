import { Component, OnInit } from '@angular/core';
import { NavParams, Platform  } from '@ionic/angular';
import {ContactFieldType, Contacts, IContactFindOptions} from '@ionic-native/contacts';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  ourtype: ContactFieldType[] = ['displayName'];
  contactsFound = [];
  searchContact: any = [];
  contact: any[];
  public check;
  checked: boolean;
  constructor(
      params: NavParams,
      private contacts: Contacts,
      private  platform: Platform,
      private modalCtrl: ModalController

  ) { }


  ngOnInit() {
    this.search('');
  }
  onInputChange(event: any) {
    console.log(event.detail);
    let ch = event.detail.checked;
    if (event.detail.checked === true) {
      ch = 1;
      console.log(ch);
    } else {
      ch = 0;
      console.log(ch);
    }
  }
  inviteContact() {
    console.log('Contatcs');
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  search(q) {
    const option: IContactFindOptions = {
      filter: q
    };
    if (this.platform.is('cordova')) {
      this.contacts.find(this.ourtype, option).then(conts => {
        this.contactsFound = conts;
        this.searchContact = this.contactsFound;
        console.log('text+text');
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
