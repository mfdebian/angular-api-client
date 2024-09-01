import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../definitions';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.url, { headers: { Accept: 'application/json' } });
  }

  postUser(user: User): Observable<any> {
    return this.http.post(this.url, user, {
      headers: { Accept: 'application/json' }
    });
  }
}
