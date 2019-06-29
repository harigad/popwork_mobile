import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import { ModalController } from '@ionic/angular';
import { AddChannelComponent } from '../../components/add-channel/add-channel.component';
import {getFromLocalStorage} from '../../../utils/local-storage';

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
    currentUserId;
    public = false;
    private = false;
    constructor(
        private router: Router,
        private authService: AuthService,
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.public = true;
        this.private = false;
        this.currentUserId = getFromLocalStorage('VB_USER').user.id;
        this.getNearby('nearby');
    }

    getNearby(type) {
        this.buttonActiveNearby = type === 'nearby';
        this.buttonActivePrivate = type === 'private';
        if (type === 'nearby') {
            this.public = true;
            this.private = false;
            this.authService.getChannels().subscribe((messChannel: any) => {
                this.messages = messChannel;
            });
        } else if (type === 'private') {
            this.public = false;
            this.private = true;
            this.authService.getPrivateMess().subscribe((messPrivate: any) => {
                this.messages = messPrivate;
                for (const message of this.messages) {
                    if (message.fromuser === this.currentUserId) {
                        this.userId = message.touser;
                    } else {
                        this.userId = message.fromuser;
                    }
                }
            });
        }
    }

    goToPublicMess(id: any) {
        this.router.navigate(['chat/' + id]).then();
    }
    goToPrivateMess(id: any) {
        this.router.navigate(['private-chat/' + id]).then();
    }

    async addChannelModal() {
        const modal = await this.modalController.create({
            component: AddChannelComponent,
            cssClass: 'modalChannel'
        });
        return await modal.present();
    }
}
