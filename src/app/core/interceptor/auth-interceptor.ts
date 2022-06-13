import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

// Constants
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl: string = environment.apiBaseUrl;
  constructor() {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const params: HttpParams = req.params;
    let headers: HttpHeaders = req.headers;

    return this.sendRequest<T>(next, req, headers, params);
  }

  sendRequest<T>(
    next: HttpHandler,
    req: HttpRequest<T>,
    headers: HttpHeaders,
    params: HttpParams,
  ): Observable<HttpEvent<T>> {
    let url: string = `${this.baseUrl}${req.url}`;
    req = req.clone({
      url,
      headers,
      params,
    });
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: Error) => {
          if (err) {
            throwError(err);
          }
        },
      ),
    );
  }
}
