import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, throwError } from 'rxjs';

// constants
import { CONSTANT_MESSAGES, DefaultPagination } from '../helper/constants';

// interface
import { IPosts } from './IPost.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PostsService {
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  getPosts(): Observable<{ posts: IPosts[], totalRecords: number }> {
    return this.http
      .get<IPosts[]>(`posts`, {})
      .pipe(
        map((res: IPosts[]) => {
          return {
            posts: res as IPosts[],
            totalRecords: res.length
          };
        }),
        catchError(this.handleError)
      );
  }

  getPostsById(id: number): Observable<{ post: IPosts }> {
    return this.http
      .get<IPosts>(`posts/${id}`, {})
      .pipe(
        map((res: IPosts) => {
          return {
            post: res as IPosts,
          };
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => this.snackBar.open(error && error.error ? error.error.result : CONSTANT_MESSAGES.ERROR));
  }
}
