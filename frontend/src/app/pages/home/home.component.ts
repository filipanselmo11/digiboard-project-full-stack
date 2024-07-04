import { Router } from '@angular/router';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormLayoutComponent } from '../../components/form-layout/form-layout.component';
import { InputComponent } from '../../components/input/input.component';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { httpInterceptorProviders } from '../../helpers/http.interceptor';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { TransacaoService } from '../../services/transacao.service';
import { TableComponent } from '../../components/table/table.component';


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
      TableComponent
    ],
  providers: [ httpInterceptorProviders],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges {
  currentUser: any;
  isProdDialog: boolean = false;
  isTransactionDialog: boolean = false;
  isLoading: boolean = true;
  productForm: FormGroup;
  products: any[] = [];
  transactions: any[] = [];
  transactionForm: FormGroup;

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private authService: AuthService,
    private transacaoService: TransacaoService) {
    this.productForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      enterDate: new FormControl('', [Validators.required]),
      validateDate: new FormControl('', [Validators.required])
    });

    this.transactionForm = new FormGroup({
      qtdPaid: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')]),
      deliveryData: new FormControl('', [Validators.required]),
      userId: new FormControl(0, [Validators.required]),
      productId: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.authService.getProfile().subscribe({
    //   next: data => {
    //     console.log('Data ', data);
    //     this.currentUser = data;
    //   },
    //   error: err => {
    //     console.error(err.error.message);
    //   }
    // });
    this.getProducts();
    this.getTransactions();
    // this.loadTransactionForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log('Products foi atualizado');
    }
  }

  // loadTransactionForm() {
  //   this.transacaoService.getUserId().subscribe(userId => {
  //     this.transactionForm.patchValue({ userId });
  //   });

  //   this.transacaoService.getProductId().subscribe(productId => {
  //     this.transactionForm.patchValue({ productId });
  //   });
  // }

  onLogout() {
    this.router.navigate(['login']);
  }

  onProdCreate() {
    console.log('Product Form ', this.productForm.value);
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
      error : err => {
        console.error(err.error.message);
      }
    });
  }

  getProducts() {
    this.produtoService.getProducts().subscribe({
      next: data => {
        this.products = data;
        console.log('Products Array ', this.products);
        this.isLoading = false;
      },
      error: err => {
        console.error(err.error.message);
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
