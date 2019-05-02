import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Models
import { User } from '../../models/user.model';

//Services
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
    } 
  }

  authenticateUser(user: User): void {
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['suggestion']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

  onLoginSubmit(): void {
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.preventEmptyFields(user);

    if(this.validateService.fieldsAreNotEmpty){
      this.authenticateUser(user);
    }
  }
}