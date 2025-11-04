import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { products } from '../../model/model';
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

  product: products = {
    id: 0,
    nome: '',
    description: '',
    price: 0,
    image: '',
  };

  private productsService = inject(ApiService);

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.productId = +id;

        console.log('productId', this.productId);
        // Chiamata asincrona al backend per prendere il prodotto
        this.productsService.getProductByid(this.productId).subscribe(productResponse => {
          if (productResponse && productResponse.data) {
            this.product = { ...productResponse.data };
          }
        });
      }
    });
  }

  submitForm() {
    if (this.mode === 'add') {
      // crea un nuovo prodotto
      this.productsService.createProduct(this.product).subscribe(() => {
        alert('Prodotto aggiunto con successo!');
        this.router.navigate(['/backoffice']); // torna alla lista
      });
    } else if (this.mode === 'edit' && this.productId) {
      // aggiorna il prodotto esistente
      this.productsService.patchProduct(this.productId, this.product).subscribe(() => {
        alert('Prodotto aggiornato con successo!');
        this.router.navigate(['/backoffice']); // torna alla lista
      });
    }
  }
}
