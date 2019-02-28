import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NavController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ContactComponent} from '../../components/contact/contact.component';

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
  public full_name = 'Jon Doe';
  private nameEdit: FormGroup;
  private worksEdit: FormGroup;
  public full_proff = 'Senior Mobile Architect';
  public full_works = 'Walmart Labs';


  constructor(
      private formBuilder: FormBuilder,
      public modalCtrl: ModalController,
      public navCtrl: NavController,
      private  router: Router
  ) {
    this.nameEdit = this.formBuilder.group({
      nameLastname: ['', Validators.required],
    });

    this.worksEdit = this.formBuilder.group({
      profesii: ['', Validators.required],
      works: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('ionViewDidLoad SettingsPage');
    this.nameEdit = this.formBuilder.group({
      nameLastname: [this.full_name, Validators.required],
    });

    this.worksEdit = this.formBuilder.group({
      profesii: [this.full_proff, Validators.required],
      works: [this.full_works, Validators.required]
    });
  }

  showInput() {
    this.hideName = false;
    this.hideFormName = true;
  }

  saveForm() {
    console.log(this.nameEdit.value);
    this.hideName = true;
    this.hideFormName = false;
  }

  showWorkInput() {
    this.hideWork = false;
    this.hideFormWork = true;
  }

  saveFormWork() {
    console.log(this.worksEdit.value);
    this.hideWork = true;
    this.hideFormWork = false;
  }

  pushMapPage() {
    this.router.navigate(['/map']);
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ContactComponent
    });
    return await modal.present();
  }

}
