import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../auth.interceptor';
import { ButtonComponent } from '../../components/button/button.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FormLayoutComponent, InputComponent, ToolbarComponent, ButtonComponent, DialogComponent, ReactiveFormsModule ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isProdDialog: boolean = false;
  isTransactionDialog: boolean = false;
  productForm: FormGroup;
  transactionForm: FormGroup;

  constructor(private loginService: LoginService, private produtoService: ProdutoService) {
    this.productForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      enterDate: new FormControl('', [Validators.required]),
      validateDate: new FormControl('', [Validators.required])
    });

    this.transactionForm = new FormGroup({
      qtdPaid: new FormControl(0, [Validators.required]),
      deliveryData: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loginService.fetchUserDetails().subscribe((res) => {
      console.log('Ola ', res);
    });
  }

  onLogout() {
    this.loginService.logout();
  }

  onProdCreate() {
    this.produtoService.create(
      this.productForm.value.code,
      this.productForm.value.description,
      this.productForm.value.enterDate,
      this.productForm.value.validateDate,
    ).subscribe((res) => {
      console.log('Produto cadastrado');
      console.log('RES ', res);
    }, (error) => { console.error(error)});
  }

  openProdDialog() {
    this.isProdDialog = true;
  }

  closeProdDialog() {
    this.isProdDialog = false;
  }

  openTransactionDialog() {
    this.isTransactionDialog = true;
  }

  closeTransactionDialog() {
    this.isTransactionDialog = false;
  }
}
