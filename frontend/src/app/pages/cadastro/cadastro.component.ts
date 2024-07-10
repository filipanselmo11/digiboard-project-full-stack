import { Component } from '@angular/core';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ FormLayoutComponent, InputComponent, ReactiveFormsModule, ButtonComponent, CommonModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  cadastrando: boolean = true;

  constructor(private router: Router, private cadastroService: CadastroService) {
    this.cadastroForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onCadastro() {
    if (this.cadastroForm.valid) {
      this.cadastrando = false;
      this.cadastroService.create(
        this.cadastroForm.value.email,
        this.cadastroForm.value.name,
        this.cadastroForm.value.username,
        this.cadastroForm.value.password
      ).subscribe({
        next: data => {
          console.log('DATA ', data);
          this.router.navigate(['login']);
        },
        error: err => {
          console.error(err.error.message);
        }
      })
    } else {
      console.error('Cadastro Form Error');
    }
  }
}
