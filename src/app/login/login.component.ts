import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { Login } from '../models/login';
import { AuthorizationService } from '../services/authorization.service';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;  

  @Output() loginEvent = new EventEmitter();

  private emailPattern: string = Constants.DataValidationConstants.EmailPattern;

  constructor(private authService: AuthorizationService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initFormGroup();
  }

  login(loginFormValues) {
    let user: Login = {
      UserName: loginFormValues.email,
      Password: loginFormValues.password
    };
    this.authService.login(user).subscribe(res => {
      this.authService.setAuthData(res);
      this.loginEvent.emit(null);
      this.snackBar.open("You are log in!", "Got it", {
        duration: 2000
      });
    });
  };

  private initFormGroup() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, 
                                  Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, 
                                     Validators.minLength(8)])
    });
  };

}
