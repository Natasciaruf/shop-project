import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { products } from '../../model/model';

@Component({
  selector: 'app-backoffice-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backoffice-form.html',
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

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.productId = +id;
      
        this.product = {
          id: this.productId,
          nome: ' ',
          description: '',
          price: 50,
          image: ' ',
        };
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
