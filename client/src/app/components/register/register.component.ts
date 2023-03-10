import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserdbService } from 'src/app/services/userdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  register_message!: string;

  constructor(public userService: UserdbService, public authService: AuthService, private router: Router) { }
  
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_password: new FormControl('', [Validators.required])
  });

  registerUser() {
      let id = 0;
      let aux_user = new User(
        id,
        this.registerForm.value.username!,
        this.registerForm.value.password!,
        this.registerForm.value.email!
      );
      this.authService.register(aux_user).subscribe({
        next: (data) => {
          this.register_message = 'success';
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.register_message = 'error';
          let duplicated_email = err.error.includes('ER_DUP_ENTRY');
          if (duplicated_email) {
            this.register_message = 'duplicated';
          }
        },
      });
  }
}
