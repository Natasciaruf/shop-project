import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/service';
import { products } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backoffice.html',
  styleUrls: ['./backoffice.css'],
  providers: [ProductsService]
})
export class Backoffice implements OnInit {
  products: products[] = [];
  searchText = "";
  orderType: string = 'default';
  selectMode: 'grid' | 'list' = 'list';

  // visualizzazione per pagina
  itemsPerPageOptions = [2, 4, 'all'] as const;
  itemsPerPage: number | 'all' = 4; 
  currentPage = 1;

  private router = inject(Router);

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  setSelectMode(mode: 'grid' | 'list') {
    this.selectMode = mode;
  }

  get filteredProducts() { 
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
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }

  get pagedProducts() {
    if (this.itemsPerPage === 'all') return this.filteredProducts;

    const perPage = this.itemsPerPage as number;
    const start = (this.currentPage - 1) * perPage;
    const end = start + perPage;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages() {
    if (this.itemsPerPage === 'all') return 1;
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
    alert("Sei sicuro di voler eliminare il prodotto?");
  }

  viewProduct(id: number) {
    this.router.navigate(['/backoffice/products', id]);
  }
}
