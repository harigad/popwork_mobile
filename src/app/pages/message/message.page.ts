import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';


@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
    buttonActiveNearby = true;
    buttonActivePrivate: boolean;

    public messages = [];

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.getNearby('nearby');
    }

    getNearby(type) {
        this.buttonActiveNearby = type === 'nearby';
        this.buttonActivePrivate = type === 'private';
        this.authService.getMessage(type).subscribe((mess: any) => {
            console.log(mess);
            this.messages = mess;
        });
    }

}
