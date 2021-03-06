import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  // { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  // { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'confimation', loadChildren: './pages/confimation/confimation.module#ConfimationPageModule' },
  // { path: 'message', loadChildren: './pages/message/message.module#MessagePageModule' },
  { path: 'chat/:id', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'private-chat/:id', loadChildren: './pages/private-chat/private-chat.module#PrivateChatPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
