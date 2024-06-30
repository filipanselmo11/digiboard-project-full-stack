import { Component } from '@angular/core';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormLayoutComponent, InputComponent, ReactiveFormsModule, ButtonComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onCadastro() {
    this.router.navigate(['cadastro']);
  }

  onLogin() {
    this.loginService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe((res) => {
      console.log('BEm vindo(a)');
      console.log('REs ', res);
      this.router.navigate(['home']);
    }, (error) => console.error(error));
  }
}
