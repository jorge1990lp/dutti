import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

// JSON
//import usersList from 'src/assets/json/users.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  //users: any = usersList;
  unregistered: boolean = false;
  invalid: boolean = false;
  messageError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }
  loginUser() {
    if (this.loginForm.invalid) { return }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    
    this.authService.login(username, password).subscribe( (token: string) => {
      localStorage.setItem('access_token', token);
      this.router.navigate(['/principal/ships']);
    }, error => {
      console.log('error', error);
      setTimeout(() => {
        this.unregistered = false;
      }, 2000)
        this.unregistered = true;
    });
  }
}

