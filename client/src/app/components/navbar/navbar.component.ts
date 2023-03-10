import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  [x: string]: any;
  @Input() logged!: boolean;
  userData!:any;
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
    private userService: UserdbService,
    private router: Router
  ) {}


  ngOnInit(): void {
    // Check the obserbable status
    this.authService.isLoggedIn.subscribe((status) => {this.isLoggedIn = status;});
    // Check if user is in localStorage
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
      this.userService.getUser().subscribe( {
        next: (data) => {
          console.log(data);
    
         this.userData = data;
        },
        error: (err) => {
          console.log('No se ha podido encontrar el usuario');
        },
       });
    }
  }

  getLogout(): void {
    this.token = this.storageService.getUser();
    console.log(this.token);
    //this.authService.logout(this.token);
    this.storageService.removeUser();

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
