import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;
  messageError: String = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: [ '', [Validators.required, Validators.minLength(3)]],
      last_name: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6)]],

    })
  }

  registerUser() {
    if (this.registerForm.invalid) { return }
    const firstname = this.registerForm.value.first_name;
    const lastname = this.registerForm.value.last_name;
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;

    this.authService.register(firstname, lastname, username, email).subscribe((token: string) => {
      localStorage.setItem('access_token', token);
      this.router.navigate(['/principal/ships'])
    }, error => {
      setTimeout(() => {
        this.messageError = '';
      }, 2000)
        this.messageError = error;
    });
  }
}