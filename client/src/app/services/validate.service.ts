import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  emailIsValid: boolean;
  fieldsAreNotEmpty: boolean; 

  constructor() { }

  checkIfEmpty(property: any){ 
    const re: any = /\w/;

    if(property){
      return re.test(property)
    } else {
      return false
    }
  }

  validateFields(arg: object){ 
    this.fieldsAreNotEmpty = true;

    for(let i=0; i<Object.keys(arg).length; i++){
      if(!this.checkIfEmpty(arg[Object.keys(arg)[i]])){ 
        this.fieldsAreNotEmpty = false;
      } 
    }
  }
}