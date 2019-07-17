import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isUserLogin: boolean;
  hasRegisteredUsers: boolean;

  constructor(
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.isUserLogin = this.authService.isLoginUser();
    this.authService.hasRegisteredUsers().subscribe(response => {
        this.hasRegisteredUsers = response;
    })
  }

  registerCallback() {
    this.hasRegisteredUsers = true;
  }

  loginCallback() {
    this.isUserLogin = true;
  }
}
