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

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const user: object = {email: email, password: password };
    console.log(user);

    return this.http.post('http://localhost:8000/api/login', user, {
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
}
