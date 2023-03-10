import { Component, OnInit } from '@angular/core';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData!:any;
  
  constructor(private userService: UserdbService) {}

  ngOnInit(): void {
          // Recoger datos necesarios para perfil
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
