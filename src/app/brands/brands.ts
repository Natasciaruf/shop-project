// // import { Component } from '@angular/core';
// import { RouterLink, RouterOutlet } from '@angular/router';
// @Component({
//   selector: 'app-brands',
//   imports: [RouterLink, RouterOutlet],
//   templateUrl: './brands.html',
//   styleUrl: './brands.css',
// })
// export class Brands {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrandService, IBrand } from '../../service/brand.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './brands.html',
  styleUrls: ['./brands.css'],
  providers: [BrandService]
})
export class Brands implements OnInit {
  brands: IBrand [] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

loadBrands() {
  this.brandService.getBrands().subscribe({
    next: (res) => {
      console.log('Dati ricevuti dal backend:', res);
 ;
    },
    error: (err) => console.error('Errore nel caricamento dei brand', err)
  });
}

  editBrand(id: number) {
    console.log('Modifica brand con ID:', id);
  }

  deleteBrand(id: number) {
    if (!confirm('Sei sicuro di voler eliminare questo brand?')) return;

    this.brandService.deleteBrand(id).subscribe({
      next: () => this.brands = this.brands.filter(b => b.id !== id),
      error: (err) => console.error('Errore eliminazione brand', err)
    });
  }
}
