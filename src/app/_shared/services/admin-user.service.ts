import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http
      .get<any>('https://dummyjson.com/users')
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }

  addUser(params: any) {
    return this.http
    .post<any>(`https://dummyjson.com/users/add`,params.body)
    .pipe(
      catchError((err) =>
        err.error === 404 ? throwError('Not found') : throwError(err)
      )
    );
  }

  updateUser(params:any) {
    return this.http
      .put<any>(`https://dummyjson.com/users/${params.id}`,params.body)
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }

  deleteUser(params:any) {
    return this.http
      .delete<any>(`https://dummyjson.com/users/${params.id}`)
      .pipe(
        catchError((err) =>
          err.error === 404 ? throwError('Not found') : throwError(err)
        )
      );
  }
}
