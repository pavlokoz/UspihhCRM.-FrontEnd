import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../constants';
import { User } from '../models/user';
import { AuthorizationService } from '../services/authorization.service';
import { MatSnackBar, MatSnackBarModule  } from '@angular/material'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;  
  @Output() registerEvent = new EventEmitter();

  private namePattern: string = Constants.DataValidationConstants.NamePattern;
  private passwordPattern: string = Constants.DataValidationConstants.PasswordPattern;
  private emailPattern: string = Constants.DataValidationConstants.EmailPattern;

  constructor(private authService: AuthorizationService,
              private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.initFormGroup();
  };

  register(registerFormValues) {
    let user: User = {
      Email: registerFormValues.email,
      LastName: registerFormValues.lastName,
      FirstName: registerFormValues.firstName,
      UserId: 0,
      DateOfBirth: registerFormValues.dateOfBirth,
      Password: registerFormValues.password,
      ConfirmPassword: registerFormValues.confirmPassword,
      Role: 1
    };
    this.authService.register(user).subscribe(res => {
      this.registerEvent.emit(null);
      this.snackBar.open("You are registered!", "Got it", {
        duration: 2000
      });
    });
  };

  hasError (controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  private passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { 'mismatch': true };
  };

  private initFormGroup() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, 
                                  Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, 
                                     Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl('', [Validators.required, 
                                            Validators.pattern(this.passwordPattern)]),    
      firstName: new FormControl('', [Validators.required, 
                                      Validators.pattern(this.namePattern)]),
      lastName: new FormControl('', [Validators.required, 
                                     Validators.pattern(this.namePattern)]),
      dateOfBirth: new FormControl(new Date())
    }, this.passwordMatchValidator);
  };
}
