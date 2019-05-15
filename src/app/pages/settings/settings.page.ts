import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NavController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ContactComponent} from '../../components/contact/contact.component';
import {ChartComponent} from '../../components/chart/chart.component';
import {AuthService} from '../../../services/auth.service';
import {getFromLocalStorage, setToLocalStorage} from '../../../utils/local-storage';
import {CallComponent} from '../../components/call/call.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public hideName = true;
  public hideWork = true;
  public hideFormName;
  public hideFormWork;
  public nameEdit: FormGroup = new FormGroup({});
  public worksEdit: FormGroup = new FormGroup({});
  public photoEdit: FormGroup = new FormGroup({});
  public user: any = {};
  public changePhoto = true;
  public savePhoto = false;
  public url;
  public  company;

  constructor(
      private formBuilder: FormBuilder,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      private  router: Router,
      private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = getFromLocalStorage('VB_USER').user || {};
    this.url = this.user.photo;
    this.initForms();
  }

  showInput() {
    this.hideName = false;
    this.hideFormName = true;
  }

  saveForm() {
    this.authService.saveForm(this.nameEdit.value).subscribe((saved: boolean) => {
      if (saved) {
        const userData = getFromLocalStorage('VB_USER');
        userData.user.fullname = this.nameEdit.value.name;
        setToLocalStorage('VB_USER', userData);
        this.user = getFromLocalStorage('VB_USER').user || {};
        this.nameEdit = new FormGroup({
          name: new FormControl(this.nameEdit.value.name),
        });
        this.hideName = true;
        this.hideFormName = false;
      }
    });
  }

  saveFormWork() {
    const profile = this.worksEdit.value;
    this.authService.saveForm(this.worksEdit.value).subscribe((saved: boolean) => {
      if (saved) {
        const userData = getFromLocalStorage('VB_USER');
        this.user.profile = userData.user.profile = profile;
        setToLocalStorage('VB_USER', userData);
        this.hideFormWork = false;
        this.hideWork = true;
      }
    });
  }

  showWorkInput() {
    this.hideWork = false;
    this.hideFormWork = true;
  }

  processFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
      this.changePhoto = false;
      this.savePhoto = true;
    }
  }

  toSavePhoto() {
    this.authService.saveForm(this.photoEdit.value).subscribe((saved: boolean) => {
      if (saved) {
        const userData = getFromLocalStorage('VB_USER');
        userData.user.photo = this.url;
        setToLocalStorage('VB_USER', userData);
        this.user = getFromLocalStorage('VB_USER').user || {};
        this.nameEdit = new FormGroup({
          photo: new FormControl(this.photoEdit.value.url),
        });
      }
    });
    this.changePhoto = true;
    this.savePhoto = false;
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ContactComponent
    });
    return await modal.present();
  }

  async presentModalChart() {
    const modal = await this.modalCtrl.create({
      component: ChartComponent
    });
    return await modal.present();
  }

  async presentModalCall() {
    const modal = await this.modalCtrl.create({
      component: CallComponent,
      cssClass: 'modalCall'
    });
    return await modal.present();
  }

  private initForms() {
    this.nameEdit = new FormGroup({
      name: new FormControl(this.user.fullname)
    });
    this.worksEdit = new FormGroup({
      jobtitle: new FormControl(this.user.profile ? this.user.profile.jobtitle : ''),
      company: new FormControl(this.user.profile ? this.user.profile.company : ''),
    });
    this.photoEdit = new FormGroup({
      photo: new FormControl()
    });
  }
}
