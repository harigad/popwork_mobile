import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NavController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ContactComponent} from '../../components/contact/contact.component';
// import {PlacesComponent} from '../../components/places/places.component';
import { ChartComponent } from '../../components/chart/chart.component';
import {AuthService} from '../../../services/auth.service';
import {getFromLocalStorage, setToLocalStorage} from '../../../utils/local-storage';
import { CallComponent } from '../../components/call/call.component';

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
  public user: any = {};
  public changePhoto = true;
  public savePhoto = false;
  public url;
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
    this.nameEdit = new FormGroup({
      name: new FormControl(),
    });
    this.worksEdit = new FormGroup({
      jobtitle: new FormControl(),
      company: new FormControl()
    });
      this.nameEdit = new FormGroup({
        name: new FormControl(this.user.name)
      });
      this.worksEdit = new FormGroup({
        jobtitle: new FormControl(this.user.jobtitle),
        company: new FormControl(this.user.company)
      });
  }

  showInput() {
    this.hideName = false;
    this.hideFormName = true;
  }

  saveForm() {
    this.authService.saveForm(this.nameEdit.value).subscribe((user: any ) => {
      this.user = user;
      const userData = getFromLocalStorage('VB_USER');
      userData.user = user;
      setToLocalStorage('VB_USER', userData);
      this.nameEdit = new FormGroup({
        name: new FormControl(user),
      });
    });
    this.hideName = true;
    this.hideFormName = false;
  }

  saveFormWork() {
    this.authService.saveForm(this.worksEdit.value).subscribe((user: any ) => {
      this.user = user;
      const userData = getFromLocalStorage('VB_USER');
      userData.user = user;
      setToLocalStorage('VB_USER', userData);
      this.worksEdit = new FormGroup({
        jobtitle: new FormControl(user),
        company: new FormControl(user),
      });
    });
    console.log(this.worksEdit.value);
    this.hideWork = true;
    this.hideFormWork = false;
  }

  showWorkInput() {
    this.hideWork = false;
    this.hideFormWork = true;
  }

  pushMapPage() {
    this.router.navigate(['/map']);
  }
  pushMessagePage() {
    this.router.navigate(['/message']);
  }

  pushSettingsPage() {
    this.router.navigate(['/settings']);
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
  toSavePhoto(e) {
    console.log(e);
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

}
