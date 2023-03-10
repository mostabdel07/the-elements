import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator,NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[appCheckRating]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting: CheckRatingDirective,
    multi:true
  }]
})
export class CheckRatingDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    if((control.value=="1")||(control.value=="2")||(control.value=="3")||(control.value=="4")||(control.value=="5")){
      return null;//cuando no hay error
    }else{
      return {'CheckRatingDirective': true};
    }
  }

}
