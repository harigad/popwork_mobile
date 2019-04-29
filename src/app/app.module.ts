import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// import {ComponentsModule} from './components/components.module';
import {Contacts} from '@ionic-native/contacts';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {TokenInterceptor} from '../services/http-interceptor.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {CodePush} from "@ionic-native/code-push/ngx";
import {Geolocation} from "@ionic-native/geolocation/ngx";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [
  ],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    // ComponentsModule
  ],
  providers: [
    StatusBar,
    CodePush,
    SplashScreen,
    AuthService,
    Geolocation,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    Contacts
  ],
  bootstrap: [AppComponent],
  exports: [
    BrowserModule
  ]
})
export class AppModule {}
