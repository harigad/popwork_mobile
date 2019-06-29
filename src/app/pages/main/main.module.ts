import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {MainPage} from './main.page';
import {MomentModule} from 'ngx-moment';

const routes: Routes = [
    {
        path: '',
        component: MainPage,
        children:
            [
                {
                    path: 'message',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './pages/message/message.module#MessagePageModule'
                            }
                        ]
                },
                {
                    path: 'map',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './pages/map/map.module#MapPageModule'
                            }
                        ]
                },
                {
                    path: 'settings',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: './pages/settings/settings.module#SettingsPageModule'
                            }
                        ]
                },
                {
                    path: '',
                    redirectTo: '/main/map',
                    pathMatch: 'full'
                }
            ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        MomentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MainPage]
})
export class MainPageModule {
}
