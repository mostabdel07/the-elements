import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData!:{
    id: '',
    username: '',
    email: ''
  };
  
  constructor(private userCookie: CookieService,) {}

  ngOnInit(): void {
    this.userData = JSON.parse(this.userCookie.get('userCookie'));
    console.log(this.userData);
  }


}
