import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from './app/pages/home/gl-ionic-background-video/dist/loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
defineCustomElements(window).then();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
