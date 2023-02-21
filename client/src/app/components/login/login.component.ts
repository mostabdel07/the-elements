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
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  // Log in
  user!:User | null;
  users_db!:User[];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role!:string;

  constructor(private authService: AuthService, private storageService: StorageService, private userCookie: CookieService, private router: Router, private userDB:UserdbService){}


  ngOnInit(): void {   
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser()._role;
    }

  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('dentro del next');
        console.log(this.user);//da undefined

        if(this.user != null) {
          // Save on localStorage
          this.storageService.saveUser(this.user);
          // Save on Cookie
          this.userCookie.set('userCookie', JSON.stringify(this.user), {expires: 3});
    
          this.isLoginFailed = false;
          this.role = this.storageService.getUser()._role;
          console.log(this.role);
          this.router.navigate(['/'])
        }else {
          this.errorMessage = "error";
          this.isLoginFailed = true;
          console.log(this.errorMessage);
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err.error.message);
      }
    });
  }
}
