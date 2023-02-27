import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  // Log in
  user_token!: object | null;
  users_db!: User[];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role!: string;

  aux!: any;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private userCookie: CookieService,
    private router: Router,
    private userDB: UserdbService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser()._role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe((res) => {
      if (res !== null) {
        console.log(res); //devuelve token
        console.log('respuesta bd');
        // Save on localStorage
        this.storageService.saveUser(res);
        //Save cookie
        this.userCookie.set('userCookie', JSON.stringify(res));
        this.aux = this.authService.isLoggedIn.subscribe((data) => {
          console.log('aux' + data);
        });

        this.router.navigate(['']);
      } else {
        //login failed
        this.errorMessage = 'Incorrects username or password';
        console.log(this.errorMessage);
      }
    });
  }
}
