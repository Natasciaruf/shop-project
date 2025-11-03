import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../service/service';
import { products } from '../../model/model';

@Component({
  selector: 'app-backoffice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backoffice-form.html',
 providers: [ProductsService]
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

  private productsService = inject(ProductsService);
  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.productId = +id;
      
        const foundProduct = this.productsService.getProductByid(this.productId)
        if(foundProduct){
this.product = {...foundProduct};
        }
      }
    });
  }

  submitForm() {
  alert("Prodotto aggiunto con successo");
  }

  save(){
    if(this.mode === 'add'){
  location.reload()
    } else{
      this.router.navigate(['/backoffice'])
    }
  }
}
