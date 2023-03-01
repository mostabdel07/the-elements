import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() logged!: boolean;

  showMenu = false;
  showUser = false;
  isLoggedIn = false;

  menuShow = false;

  user!: User;
  username!: string;
  role!: string;
  token!: object;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private userCookie: CookieService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    let change = changes['logged'];

    if (change.currentValue === true) {
      this.isLoggedIn = true;
      console.log('estoy logueado');
    } else {
      this.isLoggedIn = false;
      console.log('no estoy logueado');
    }
  }

  ngOnInit(): void {
    // Check the obserbable status
    this.authService.isLoggedIn.subscribe((status) => {this.isLoggedIn = status;});
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  getLogout(): void {
    this.token = this.storageService.getUser();
    console.log(this.token);
    //this.authService.logout(this.token);
    this.storageService.removeUser();
    this.userCookie.delete('userCookie');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDropdown() {
    this.showUser = !this.showUser;
  }
}
