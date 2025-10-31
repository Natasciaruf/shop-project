import { Component, inject, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/service';
import { products } from '../../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { BackofficeAddproduct } from '../backoffice-addproduct/backoffice-addproduct';
// import { BackofficeEditproduct } from '../backoffice-editproduct/backoffice-editproduct';

@Component({
  selector: 'app-backoffice',
  standalone: true,
    imports: [CommonModule, FormsModule], //con common module utilizziamo sia *ngFor, che *ngIf
  templateUrl: './backoffice.html',
  styleUrl: './backoffice.css',
    providers: [ProductsService]
})

export class Backoffice implements OnInit{
products: products[] = [];
searchText = "";
orderType: string = 'default';
selectMode: 'grid' | 'list' = 'list'
  private router = inject(Router);

pageSize = 4;
currentPage = 1;

constructor(private productsService: ProductsService,  ) { }

ngOnInit(): void {
  this.products =  this.productsService.getProducts();
}

setSelectMode(mode: 'grid' | 'list'){
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
    filtered = filtered.sort((a, b) => a.price - b.price);
      break;

    default:
      break;
  }

  return filtered;
}

  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

    get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage = this.currentPage - 1;
    this.products = [...this.products]; 
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage = this.currentPage + 1;
    this.products = [...this.products]; 
  }
}

addProduct(){
  this.router.navigate(['backoffice/products/add'])
}

editProduct(id: number){
this.router.navigate(['/backoffice/products/edit', id])
}

deleteProduct(id: number){
alert("sei sicuro di voler eliminare il prodotto?")
}

}