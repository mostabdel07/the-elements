import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showMenu = false;
  isLoggedIn = false;

  user!:User;
  username!: string;
  role!:string;
  
  constructor(private storageService: StorageService, private authService: AuthService , private userCookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    // Check the obserbable status
    this.authService.isLoggedIn.subscribe(status => {this.isLoggedIn = status; console.log("isLogged " ,this.isLoggedIn)});
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();



    if (this.isLoggedIn) {
      this.username = this.storageService.getUser()._username;
      this.role = this.storageService.getUser()._role;
    }
  }
  
  getLogout(): void {
    this.storageService.removeUser();
    this.userCookie.delete('userCookie');
    this.authService.logout();
    this.router.navigate(['/'])
    }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

}
