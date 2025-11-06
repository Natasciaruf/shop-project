import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { IProducts } from '../../model/model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-backoffice-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './backoffice-form.html',
  providers: [ApiService]
})
export class BackofficeForm implements OnInit {
  mode: 'add' | 'edit' = 'add';
  productId?: number;

  product: IProducts = {
    id: 0,
    nome: '',
    description: '',
    price: 0,
    image: '',
  };

  private productsService = inject(ApiService);

  constructor(private route: ActivatedRoute, public router: Router,) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.productId = +id;

        this.productsService.getProductByid(this.productId).subscribe(productResponse => {
          if (productResponse && productResponse.data) {
            this.product = { ...productResponse.data };
          }
        });
      }
    });
  }

  submitForm(form: NgForm) {
    // Controllo campi obbligatori
    if (!form.valid || !this.product.nome || !this.product.description || !this.product.price) {
      alert('I campi Nome, Descrizione e Prezzo sono obbligatori!');
      return;
    }

    if (this.mode === 'add') {
      this.productsService.createProduct(this.product).subscribe(() => {
        alert('Prodotto aggiunto con successo!');
        this.router.navigate(['/backoffice']); 
      });
    } else if (this.mode === 'edit' && this.productId) {
      this.productsService.updateProduct(this.productId, this.product).subscribe(() => {
        alert('Prodotto aggiornato con successo!');
        this.router.navigate(['/backoffice']); 
      });
    }
  }
}
