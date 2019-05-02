import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from '../../models/user.model';

//Services
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() { }

  preventEmptyFields(user: User): void {
    this.validateService.validateFields(user);

    if(!this.validateService.fieldsAreNotEmpty) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 300000});
    } 
  }

  registerUser(user: User): void {
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){ 
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('An error has occurred', {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onRegisterSubmit(): void {
    const user: User = { 
      username: this.username,
      password: this.password
    }

    this.preventEmptyFields(user);

    if(this.validateService.fieldsAreNotEmpty){
      this.registerUser(user);
    } 
  }
}