import {Injectable} from '@angular/core';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {appConfig} from '../utils/app.config';
import {clearLocalStorage, getFromLocalStorage} from '../utils/local-storage';
// import {Nav} from "ionic-angular";

// import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
      // private nav: Nav
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.indexOf(appConfig.apiUrl) !== -1 && req.url.indexOf(appConfig.apiUrl+'login') === -1) {
   // if (req.url.indexOf('/apiUrl/') !== -1) {
      return this.handleRequest(req, next);
   // }
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let dupReq: any;
    const auth = getFromLocalStorage('VB_USER');
    if (auth && auth.token) {
        req = req.clone({
  headers: req.headers.set('x-access-token', ` ${auth.token}`).append('Content-Type', 'application/x-www-form-urlencoded').append('Access-Control-Allow-Origin', '*')
      });
    }
    return next.handle(req)
        .pipe(
            tap(
                (evt: HttpEvent<any>) => {
                  if (evt instanceof HttpResponse) {

                  }
                  return evt;
                },
                (err: any) => {
                  if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                      clearLocalStorage();
                    }
                  }
                })
        );
  }
}
