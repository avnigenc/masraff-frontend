import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { StorageService } from './storage.service';

const urls = [
  'login',
  'register'
];

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.checkUrl(req.url)) {
      return next.handle(req);
    } else {

      const token = localStorage.getItem('token');
      if (token) {
        req = this.addToken(req, this.storageService.getToken());
      }

      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event: ', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.log(req);
          }
          if (error.status === 400) {
            console.log(req);
          }
          return throwError(error);
        })
      );
    }
  }

  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  checkUrl(url: string) {
    const parsedUrl = url.split('/');
    const lastIndexOfUrl = parsedUrl[parsedUrl.length - 1];
    return urls.includes(lastIndexOfUrl);
  }
}
