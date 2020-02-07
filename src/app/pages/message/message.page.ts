import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {getFromLocalStorage} from '../../../utils/local-storage';
import {Events} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
        public events:Events,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.public = true;
        this.private = false;
        this.currentUserId = getFromLocalStorage('VB_USER').user.id;
        this.getNearby('public');
        this.events.subscribe("public_message_posted",function(){
            this.getNearby('public');
        }.bind(this));
    }

    ionViewDidEnter() {
        if(this.activatedRoute.snapshot.paramMap.get('msgtype') == "public"){
            this.goToPublicMess(this.activatedRoute.snapshot.paramMap.get('msgid'));
        }else if(this.activatedRoute.snapshot.paramMap.get('msgtype') == "private"){
            this.goToPrivateMess(this.activatedRoute.snapshot.paramMap.get('msgid'));
        }
    }

    getNearby(type) {
        this.buttonActiveNearby = type === 'public';
        this.buttonActivePrivate = type === 'private';
        if (type === 'public') {
            this.public = true;
            this.private = false;
            this.authService.getChannels(type).subscribe((publicChannels: any) => {
                this.messages = publicChannels;
            });
        } else if (type === 'private') {
            this.public = false;
            this.private = true;
            this.authService.getChannels(type).subscribe((privateChannels: any) => {
                this.messages = privateChannels;
            });
            // this.authService.getPrivateMess().subscribe((messPrivate: any) => {
            //     this.messages = messPrivate;
            //     for (const message of this.messages) {
            //         if (message.fromuser === this.currentUserId) {
            //             this.userId = message.touser;
            //         } else {
            //             this.userId = message.fromuser;
            //         }
            //     }
            // });
        }
    }

    goToPublicMess(mess: any, add:any = false) {
        this.router.navigate(['chat/' + mess.id, {data : JSON.stringify(mess), add:add}]).then();
    }

    addMessage(event:any, mess:any){
        event.stopPropagation();
        this.goToPublicMess(mess,true);
    }

    goToPrivateMess(id: any) {
        this.router.navigate(['private-chat/' + id]).then();
    }

}
