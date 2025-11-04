import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { products } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, HttpClientModule],
  templateUrl: './backoffice.html',
  styleUrls: ['./backoffice.css'],
  providers: [ApiService],
})
export class Backoffice implements OnInit {
  products: products[] = [];
  searchText = '';
  orderType: string = 'default';
  selectMode: 'grid' | 'list' = 'list';

  // visualizzazione per pagina 
  itemsPerPageOptions = [2, 4, 'all'] as const;
  itemsPerPage: number = 4;
  currentPage = 1;

  private router = inject(Router);
  private apiService = inject(ApiService);

  constructor() {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((response) => {
      this.products = response.data || [];
    });
  }

loadProducts(){
  //utilizzo questo metodo dopo ogni modifica come impaginazione, ricerca o ordinamento

}

  setSelectMode(mode: 'grid' | 'list') {
    this.selectMode = mode;
  }

  get filteredProducts() {
    const text = this.searchText.toLowerCase();
    let filtered = this.products.filter((p) => p.nome.toLowerCase().includes(text));

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
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }

  get pagedProducts() {
    console.log("pagedProducts called");   

    const perPage = this.itemsPerPage as number;
    const start = (this.currentPage - 1) * perPage;
    const end = start + perPage;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / (this.itemsPerPage as number));
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  addProduct() {
    this.router.navigate(['backoffice/products/add']);
  }

  editProduct(id: number) {
    this.router.navigate(['/backoffice/products/edit', id]);
  }

  deleteProduct(id: number) {
    alert('Sei sicuro di voler eliminare il prodotto?');
  }

  viewProduct(id: number) {
    this.router.navigate(['/backoffice/products', id]);
  }
}
