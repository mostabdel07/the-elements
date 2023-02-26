import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator{

  @Input('password') password!: string;
  
  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log(this.password);
    let confirm_password = control.value;
    if (confirm_password != this.password) {
      return { 'fail': true };
    }
    else {
      return null;  
    }
  }
}
