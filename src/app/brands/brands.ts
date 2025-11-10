import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrandService, IBrand } from '../../service/brand.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './brands.html',
  styleUrls: ['./brands.css'],
  providers: [BrandService]
})
export class Brands implements OnInit {
  brands: IBrand [] = [];

  private router = inject(Router);
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

loadBrands() {
  this.brandService.getBrands().subscribe({
    next: (res) => {
      console.log('Dati ricevuti dal backend:', res);
 this.brands = res.data;
    },
    error: (err) => console.error('Errore nel caricamento dei brand', err)
  });
}

addBrand(){
  this.router.navigate(['brands/add'])
}

  editBrand(id: number) {
    this.router.navigate(['brands/edit', id])
  }

  deleteBrand(id: number) {
    if (!confirm('Sei sicuro di voler eliminare questo brand?')) return;

    this.brandService.deleteBrand(id).subscribe({
      next: () => this.brands = this.brands.filter(b => b.id !== id),
      error: (err) => console.error('Errore eliminazione brand', err)
    });
  }
}
