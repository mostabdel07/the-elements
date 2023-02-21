import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserdbService {

  constructor(private http: HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get('http://localhost:4000/users', { responseType: 'json' });
  }

  deleteUser(user_id:any):Observable<any>{
    let id = user_id;
    let url = `http://localhost:4000/users/${user_id}`;

     return this.http.delete<User>(url,{responseType: "json"});
  }

  getUser(id: any){
    return this.http.get(
     ` http://localhost:4000/users/${id}`,
     {
      params:id,
      responseType: "json"
     }
    );
  }
}
