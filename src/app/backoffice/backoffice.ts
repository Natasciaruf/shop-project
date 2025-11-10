import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from '../../service/api.service';
import { IProducts } from '../../model/model';
import { BrandService } from '../../service/brand.service';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, HttpClientModule],
  templateUrl: './backoffice.html',
  styleUrls: ['./backoffice.css'],
  providers: [ApiService],
})
export class Backoffice implements OnInit {
  products: IProducts[] | undefined;
  searchText = '';
  orderType: string = 'default';
  selectMode: 'grid' | 'list' = 'list';
  brands: string[] = [];
  selectedBrand: string = '';

  itemsPerPageOptions = [2, 5, 10, 100] as const;
  itemsPerPage: number = 5;
  currentPage = 1;
  totalPages = 1;

  private router = inject(Router);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    const limit = this.itemsPerPage;

    const response = await this.apiService
      .getProducts(this.currentPage, limit, this.orderType, this.searchText, this.selectedBrand)
      .toPromise();

    this.products = response?.data || [];

    this.totalPages = response?.pagination?.totalPages || 1;
    this.currentPage = response?.pagination?.currentPage || 1;

  // popola lista brand una sola volta
  // if (!this.brands.length) {
  //   this.brands = [...new Set(this.products.map(p => p.brand))];
  // }

    // Ordinamento locale
    switch (this.orderType) {
      case 'nome-asc':
        this.products.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'nome-desc':
        this.products.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      case 'price-asc':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case 'best-price':
        this.products.sort((a, b) => a.price - b.price);
        break;
    }
  }

  setSelectMode(mode: 'grid' | 'list') {
    this.selectMode = mode;
  }

  // async loadBrands() {
  // try {
  //   const response = await this.getBrands().toPromise();
  //   // Salva i nomi dei brand nell'array
  //   this.brands = response?.data?.map((b: any) => b.name) || [];
  // } catch (err) {
  //   console.error('Errore nel caricamento dei brand', err);
  // }
// }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  changePage(i: number) {
    if (this.currentPage) {
      this.currentPage = i + 1;
      this.loadProducts();
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.loadProducts();
  }

  addProduct() {
    this.router.navigate(['backoffice/products/add']);
  }

  editProduct(id: number) {
    this.router.navigate(['/backoffice/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Sei sicuro di voler eliminare questoprodotto?')) {
      this.apiService.deleteProduct(id).subscribe({
        next: () => {
          alert(`Prodotto ${id} eliminato correttamente`);
          this.loadProducts();
        },
      });
    }
  }

  viewProduct(id: number) {
    this.router.navigate(['/backoffice/products/', id]);
  }
}
