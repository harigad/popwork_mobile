import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddChannelComponent } from '../../components/add-channel/add-channel.component';

@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
    buttonActiveNearby = true;
    buttonActivePrivate: boolean;

    public messages = [];
    userId;
    constructor(
        private router: Router,
        private authService: AuthService,
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.getNearby('nearby');
    }

    getNearby(type) {
        this.buttonActiveNearby = type === 'nearby';
        this.buttonActivePrivate = type === 'private';
        this.authService.getChannels().subscribe((mess: any) => {
            this.messages = mess;
        });
    }

    goToProductDetails(id: any) {
        this.router.navigate(['chat/' + id]);
    }

    async addChannelModal() {
        const modal = await this.modalController.create({
            component: AddChannelComponent,
            cssClass: 'modalChannel'
        });
        return await modal.present();
    }
}
