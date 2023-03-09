import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactService){}
  
  ngOnInit(): void {
    
  }

  contactForm=new FormGroup({

    email: new FormControl('',[
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),

    subject: new FormControl('',[
      Validators.required,
      ]),

    message: new FormControl('',[
      Validators.required])
  })

  submit(){

    let email = this.contactForm.controls.email.value
    let subject = this.contactForm.controls.subject.value
    let message = this.contactForm.controls.message.value

    this.contactService.sendContact(email, subject, message).subscribe({

      next: (data) => {
        alert('enviado');

        this.resetInputsvalues();
       
      
      },
      error: (err) => {
        alert('error');

        }
      });
  }


  resetInputsvalues() {
    this.contactForm.controls.email.setValue('');
    this.contactForm.controls.subject.setValue('');
    this.contactForm.controls.message.setValue('');
  }



}

  


