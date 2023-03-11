import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendContact(email:any, subject:any, message:any):Observable<any>{

    let body = {
      email: email,
      subject: subject,
      message: message,
    };

    return this.http.post('https://api.thelements.games/api/contact', body, {
      responseType: 'json',
    });
  }

}
