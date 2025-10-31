import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/service';
import { products } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
    imports: [CommonModule, FormsModule], //con common module utilizziamo sia *ngFor, che *ngIf
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
    providers: [ProductsService]
})

export class ProductList implements OnInit{
products: products[] = [];
searchText = "";
orderType: string = 'default';
selectMode: 'grid' | 'list' = 'grid'

constructor(private productsService: ProductsService) {}

ngOnInit(): void {
  this.products =  this.productsService.getProducts();
}

setSelectMode(mode: 'grid' | 'list'){
  this.selectMode = mode;
}
  get filteredProducts() { // aggiungo questo getter per filtrare dinamicamente
    const text = this.searchText.toLowerCase();

  let filtered = this.products.filter(p =>
    p.nome.toLowerCase().includes(text)
  );

  switch (this.orderType) {
    case 'nome-asc':
       filtered.sort((a, b) => a.nome.localeCompare(b.nome));
      break;

    case 'nome-desc':
 filtered.sort((a, b) => b.nome.localeCompare(a.nome));
      break;

    case 'price-asc':
    filtered.sort((a, b) => a.price - b.price);
      break;

    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;

    case 'best-price':
    filtered = filtered.sort((a, b) => a.price - b.price);
      break;

    default:
      break;
  }

  return filtered;
}

  }
