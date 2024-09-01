import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../definitions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:8080/users/';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();
  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<User[]>(this.url, { headers: { Accept: 'application/json' } })
      .subscribe(users => this.usersSubject.next(users));
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, {
      headers: { Accept: 'application/json' }
    }).pipe(
      tap((savedUser: User) => {
        savedUser.id = user.id;
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([savedUser, ...currentUsers]);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    let originalId = user.id;
    let fakeId = 10
    // fake the id for the 'database'
    if (!Array.from({length: 10}, (_, i) => i + 1).includes(user.id)) {
      user.id = fakeId
    }
    return this.http.put<User>(`${this.url}${user.id}`, user, {
      headers: { Accept: 'application/json' }
    }).pipe(
      tap((updatedUser: User) => {
        updatedUser.id = originalId;
        const currentUsers = this.usersSubject.value.map(u =>
          u.id === updatedUser.id ? updatedUser : u
        );
        this.usersSubject.next(currentUsers);
      })
    );
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(`${this.url}${id}`, {
      headers: { Accept: 'application/json' }
    }).pipe(
      tap(response => {
        if (response === 'OK') {
          const updatedUsers = this.usersSubject.getValue().filter(user => user.id !== id);
          this.usersSubject.next(updatedUsers);
        } else {
          console.error(`Failed to delete user with ID ${id}. Status: ${response}`);
        }
      })
    );
  }
}
