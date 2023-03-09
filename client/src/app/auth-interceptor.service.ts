import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from './services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private storage: StorageService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //1. Get token from localStorage
    const token:string = this.storage.getUser();
    let request = req;

    //2.If token req.clone sets Headers to requests
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(//* pipe redirect user to login page when token expires
      catchError((err:HttpResponse<any>) =>{
        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        return throwError(() => err)
      })
    );

    //TODO add Interceptors to providers in app.modules
  }
}
