import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm=new FormGroup({

    email: new FormControl('',[
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),

    message: new FormControl('',[
      Validators.required])
  })

  submit(){
  }

}
