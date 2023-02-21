import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user/user';
import { UserdbService } from './userdb.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private _isLoggedIn = new BehaviorSubject(false);
    public isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private userService: UserdbService, private http:HttpClient) {}


  login(username:string,password:string): Observable<any>{    
    const user = new User(username, password);
    const body = JSON.stringify(user);
    console.log(body);

      return this.http.post('http://localhost:4000/login',body, { responseType: 'text' });
    };

    logout(): void {
          this._isLoggedIn.next(false);
      };

  register(user:User):void {
     //this.userService.addUser(user);

  }
}
