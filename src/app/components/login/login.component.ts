import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.auth.user$) {
      console.log('user is already login in route to home');
      this.router.navigate(['/home']);
    }
  }

}
