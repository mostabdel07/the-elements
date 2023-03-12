import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  getRecord():Observable<any>{
    return this.http.get('https://www.thelements.games/api/games', { responseType: 'json' });
  }

}
