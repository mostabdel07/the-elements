import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user/user';
import { UserdbService } from './userdb.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject(false);
  public isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private userService: UserdbService, private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const user: object = { username: username, password: password };
    console.log(user);

    return this.http.post('http://localhost:4000/login', user, {
      responseType: 'json',
    }).pipe(
      map(res => {
        if (res !== null) {
          console.log('servicio login not NULL');
          this._isLoggedIn.next(true);
        }
        return res;
      })
    );
  }

  // logout(token:object): Observable<object>{
  //   console.log(token);
  //  return this.http.post<object>('http://localhost:4000/logout', token, {responseType: "json"})
  // }

  register(user: User): void {
    //this.userService.addUser(user);
  }
}
