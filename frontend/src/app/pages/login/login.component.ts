import { Component } from '@angular/core';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      FormLayoutComponent,
      InputComponent,
      ReactiveFormsModule,
      ButtonComponent,
      CommonModule,
      AlertComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  logando: boolean = true;
  showAlert!: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onCadastro() {
    this.router.navigate(['cadastro']);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.logando = false;
      this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      ).subscribe({
        next: data => {
          setTimeout(() => {
            this.showAlert = true;
          }, 1000);
          this.router.navigate(['home']);
        },
        error: err => {
          console.error(err);
          this.logando = true;
        }
      });
    } else {
      console.log('Login Form Error');
    }
  }
}
