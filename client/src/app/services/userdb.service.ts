import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserdbService {
  constructor(private http: HttpClient) {}

  addUser(user_to_add: User): Observable<any> {
    let name = user_to_add.username;
    let email = user_to_add.email;
    let password = user_to_add.password;

    let body = {
      name: name,
      email: email,
      password: password,
    };

    return this.http.post('http://localhost:8000/api/users', body, {
      responseType: 'json',
    });
  }

  updateUser(user_to_update: User): Observable<any> {
    let id = user_to_update.id;
    let name = user_to_update.username;
    let email = user_to_update.email;
    let password = user_to_update.password;

    let body = {
      name: name,
      email: email,
      password: password,
    };

    return this.http.put(`http://localhost:8000/api/users/${id}`, body, {
      responseType: 'json',
    });
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8000/api/users', {
      responseType: 'json',
    });
  }

  deleteUser(user_id: any): Observable<any> {
    let url = `http://localhost:8000/api/users/${user_id}`;

    return this.http.delete<User>(url, { responseType: 'json' });
  }

  getUser(id: any) {
    return this.http.get(` http://localhost:8000/api/users/${id}`, {
      params: id,
      responseType: 'json',
    });
  }

  getUserByUsername(username: any): Observable<any>  {
    return this.http.get(` http://localhost:8000/api/users/${username}`, {
      params: username,
      responseType: 'json',
    });
  }
}
