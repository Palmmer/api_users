import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts() {
    return this.http
      .get<any>('https://dummyjson.com/posts')
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }

  getPostsById(params: any) {
    return this.http
      .get<any>(`https://dummyjson.com/posts/user/${params.id}`)
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }

  addPosts(params: any) {
    return this.http
    .post<any>(`https://dummyjson.com/posts/add`,params.body)
    .pipe(
      catchError((err) =>
        err.error === 404 ? throwError('Not found') : throwError(err)
      )
    );
  }

  updatePosts(params:any) {
    return this.http
      .put<any>(`https://dummyjson.com/posts/${params.id}`,params.body)
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }

  deletePosts(params:any) {
    return this.http
      .delete<any>(`https://dummyjson.com/posts/${params.id}`)
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }
}
