import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users!: User[];
  aux_users!: any;
  user!: User;

  ipp !: number;
  cp !: number;

  constructor(public userService:UserdbService){
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.users =  [];
    // this.userService.getUsers().subscribe(dbusers =>
      
    //   dbusers.forEach((dbuser: any) => {
    //       this.user = new User(dbuser.name,dbuser.password);
    //       this.users.push(this.user);
    //   })
    //   );
    this.ipp = 10;
    this.cp = 1;
    this.getUsersObservables().then((usersdb)=>{
      usersdb.forEach((dbuser: any) => {
        this.user = new User(dbuser.id,dbuser.name,dbuser.password,dbuser.email);
        this.users.push(this.user);
      })
    });
    console.log(this.users);
  }

  getUsersObservables(){
    return this.userService.getUsers().toPromise()
  }
  informar():void{
      console.log(this.users);
  }
  deleteUser(user_id:Number):void{
    console.log("Entro en delete");
    this.userService.deleteUser(user_id).subscribe({
      next: data => {
        this.users.forEach(element => {
          
        });

        const auxiliar_users = this.users.filter(object => {
          return object.id !== user_id;
        });
        this.users = auxiliar_users;
      },
      error: err => {
        console.log("No se ha podido borrar el usuario :(");
      }
    });
  }
}
