import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer/developer';

@Injectable({
  providedIn: 'root'
})

export class DeveloperService {

  constructor(private http:HttpClient) {}


  getDeveloperBoard(): Observable<Object[]>{//tipar correctamente mas adelante
    return this.http.get<any[]>('http://localhost:4000/team', {responseType: 'json'})
  }

  getDeveloper(id:any):Observable<Object[]>{
    return this.http.get<any[]>(`http://localhost:4000/team/${id}`, {responseType: 'json'})
  }

  updateDescription(id:any, updated_description:any):Observable<Developer>{
    return this.http.put<Developer>(`http://localhost:4000/team/${id}`,{description: updated_description}, {
      params:id,
      responseType: "json"
     })
  }

  addDeveloper(dev:Object):Observable<Developer>{
    return this.http.post<Developer>('http://localhost:4000/team',dev, {responseType: 'json'})
  }

  deleteDeveloper(id:any):Observable<any>{
    return this.http.delete<Developer>(`http://localhost:4000/team/${id}`, {responseType: 'json'})
  }
}