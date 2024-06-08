import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
loginForm: FormGroup;
registerForm: FormGroup;
activeForm: 'login' | 'register' = 'login';

constructor( private _fb: FormBuilder,
  private _router: Router,
  private _snackBar: MatSnackBar){
    this.loginForm = this._fb.group({});

    this.registerForm = this._fb.group({});
  }
  
ngOnInit() {
  this.loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  this.registerForm = this._fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

toggleForm(form: 'login' | 'register') {
  this.activeForm = form;
}

login() {
  if (this.loginForm.valid) {
    console.log("Login info==>", this.loginForm.value);
    this._router.navigate(['/budget-planner/dashboard']);
  } else {
    this._snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
  }
}
register() {
  if (this.registerForm.valid) {
    console.log("Register info==>>", this.registerForm.value);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    this._router.navigate(['/budget-planner/login']);
  } else {
    this._snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
  }
}


}
