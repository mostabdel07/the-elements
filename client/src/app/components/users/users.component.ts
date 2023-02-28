import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { UserdbService } from 'src/app/services/userdb.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  aux_user!: User;
  user_to_add!: User;
  user_to_update = new User(this.users.length + 1, 'dumnmy', '12345678'); //Lo inicializo aqui y no en el OnInit porque da error en toda la pagina y lo pilla null

  ipp!: number;//Items per page
  cp!: number;//Current page

  add_user_message!: string;    //Tipo de mensaje a mostrar
  update_user_message!: string; //Tipo de mensaje a mostrar
  //TODO: Los mensajes por como funciona ahora estan duplicados y solo se muestran por el tipo de mensaje
  //Se puede arreglar para que no se duplique tanto HTML y poner el mensaje de cada error y eso pero bueno.

  constructor(public userService: UserdbService) {}

  ngOnInit(): void {
    this.add_user_message = '';
    this.update_user_message = '';
    this.ipp = 10;
    this.cp = 1;
    this.getUsersFromDB();
    console.log(this.users);
  }

  
  //Formularios reactivos
  addUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  editUserForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  getUsersObservables() {
    return this.userService.getUsers().toPromise();
  }

  /**
   * Este metodo lo llamo por cada cambio que sucede en la base de datos y asi esta sincronizado
   * Seguramente haya otra opcion mas optimizada pero bueno, funciona xd
   */
  getUsersFromDB(): void {
    this.users = [];
    this.getUsersObservables().then((usersdb) => {
      usersdb.forEach((dbuser: any) => {
        this.aux_user = new User(
          dbuser.id,
          dbuser.name,
          dbuser.password,
          dbuser.email
        );
        this.users.push(this.aux_user);
      });
    });
  }

  deleteUser(user_id: Number): void {
    this.userService.deleteUser(user_id).subscribe({
      next: (data) => {
        const auxiliar_users = this.users.filter((object) => {
          return object.id !== user_id;
        });
        this.users = auxiliar_users;
        this.getUsersFromDB();
      },
      error: (err) => {
        console.log('No se ha podido borrar el usuario :(');
      },
    });
  }

  addUser(): void {
    let id = this.users.length;
    this.user_to_add = new User(
      id,
      this.addUserForm.value.username!,
      this.addUserForm.value.password!,
      this.addUserForm.value.email!
    );
    this.userService.addUser(this.user_to_add).subscribe({
      next: (data) => {
        this.add_user_message = 'success';
        this.getUsersFromDB();
      },
      error: (err) => {
        this.add_user_message = 'error';
        let duplicated_email = err.error.includes('ER_DUP_ENTRY');
        if (duplicated_email) {
          this.add_user_message = 'duplicated';
        }
      },
    });
  }

  getUserToUpdate(user: User): void {
    this.user_to_update = user;
    this.editUserForm.controls['username'].setValue(user.username);
    this.editUserForm.controls['email'].setValue(user.email);
    this.editUserForm.controls['password'].setValue(user.password);
  }

  updateUser(): void {
    //Por si el admin envia el formulario sin nada
    let username = this.editUserForm.value.username!;
    let password = this.editUserForm.value.password!;
    let email = this.editUserForm.value.email!;

    let aux_user = new User(this.user_to_update.id, username, password, email);

    this.userService.updateUser(aux_user).subscribe({
      next: (data) => {
        this.update_user_message = 'success';
        this.getUsersFromDB();
      },
      error: (err) => {
        this.update_user_message = 'error';
        let duplicated_email = err.error.code.includes('ER_DUP_ENTRY');
        if (duplicated_email) {
          this.update_user_message = 'duplicated';
        }
      },
    });
  }
}
