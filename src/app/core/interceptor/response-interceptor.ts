import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      tap(
        () => {
          // do something on success before passing response to servies
        },
        (error: HttpErrorResponse) => {
          // here we handled global errors like 401/404/500
          return throwError(error);
        },
      ),
    );
  }
}
