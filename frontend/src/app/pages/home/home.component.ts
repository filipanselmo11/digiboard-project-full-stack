import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../../services/transacao.service';
import { TableComponent } from '../../components/table/table.component';
import { UsuarioService } from '../../services/usuario.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormLayoutComponent,
    InputComponent,
    ToolbarComponent,
    ButtonComponent,
    DialogComponent,
    ReactiveFormsModule,
    CardComponent,
    TableComponent,
  ],
  providers: [
    UsuarioService,
    AuthService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: any;
  isProdDialog: boolean = false;
  isTransactionDialog: boolean = false;
  isLoading: boolean = true;
  cadastrando: boolean = true;
  productForm: FormGroup;
  products$: Observable<any[]>;
  transactions: any[] = [];
  transactionForm: FormGroup;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private authService: AuthService,
    private transacaoService: TransacaoService,
    private usuarioService: UsuarioService) {
    this.productForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      enterDate: new FormControl('', [Validators.required]),
      validateDate: new FormControl('', [Validators.required])
    });

    this.transactionForm = new FormGroup({
      qtdPaid: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')]),
      deliveryData: new FormControl('', [Validators.required]),
      userId: new FormControl(''),
      productId: new FormControl(''),
    });

    this.products$ = this.produtoService.prods$;


  }

  ngOnInit(): void {
    this.getUser();
    this.getProds();
    this.getTransactions();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onProdCreate() {
    if (this.productForm.valid) {
      this.cadastrando = false;
      this.produtoService.create(
        this.productForm.value.code,
        this.productForm.value.description,
        this.productForm.value.enterDate,
        this.productForm.value.validateDate,
      ).subscribe({
        next: data => {
          console.log('Produto cadastrado');
          console.log('Data ', data);
          this.closeProdDialog();
        },
        error: err => {
          console.error(err.error.message);
        }
      });
    } else {
      console.log('Product Form error');
    }
  }

  getUser() {
    this.usuarioService.getMe().subscribe({
      next: user => {
        this.user = user.name;
        this.transacaoService.getUserId(user.id).subscribe((userData: any) => {
          this.transactionForm.patchValue({ userId: userData.id });
        });
      }, error: err => {
        console.error(err);
      }
    });
  }

  getProds() {
    this.produtoService.getProds().subscribe({
      next: (prods) => {
        prods.forEach(prod => {
          this.transacaoService.getProdId(prod.id).subscribe((productData: any) => {
            this.transactionForm.patchValue({ productId: productData.id });
          });
        })
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  onTransactionCreate() {
    console.log('Transaction Form ', this.transactionForm.value);
    this.transacaoService.create(
      this.transactionForm.value.qtdPaid,
      this.transactionForm.value.deliveryData,
      this.transactionForm.value.userId,
      this.transactionForm.value.productId
    ).subscribe({
      next: data => {
        console.log('Compra realizada');
        console.log('Data ', data);
        this.closeTransactionDialog();
      },
      error: err => {
        console.error(err.error.message);
      }
    });
  }

  getTransactions() {
    this.transacaoService.getTransactions().subscribe({
      next: data => {
        this.transactions = data;
        console.log('Transaction array ', this.transactions);
        this.isLoading = false;
      },
      error: err => {
        console.error(err.error.message);
      }
    });
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
