import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {_} from 'underscore';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(
      public auth: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request.method);
    if (!_.contains(request.url, 'login')) {
      if (this.auth.getToken()) {
        request = request.clone({
          headers: request.headers.set('Authorization',  `Bearer ${this.auth.getToken()}`)
              .append('Access-Control-Allow-Origin', '*')
        });
      }
    }
    return next.handle(request);
  }
}
