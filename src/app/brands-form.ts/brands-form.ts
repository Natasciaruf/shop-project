import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BrandService, IBrand } from '../../service/brand.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './brands-form.html',
  styleUrls: ['./brands-form.css'],
  providers: [BrandService],
})
export class BrandFormComponent implements OnInit {
  mode: 'add' | 'edit' = 'add';
  brandId?: number;

  brand: IBrand = {
    id: 0,
    name: '',
    description: '',
    logo_url: '',
  };

  private brandService = inject(BrandService);

  constructor(private route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.brandId = +id;

        this.brandService.getBrandById(this.brandId
        ).subscribe((brandResponse) => {
          if (brandResponse && brandResponse.data) {
            this.brand = { ...brandResponse.data };
          }
        });
      }
    });
  }

  submitForm(form: NgForm) {
    if (!form.valid || !this.brand.name || !this.brand.description) {
      alert('I campi Nome e Descrizione sono obbligatori!');
      return;
    }

    if (this.mode === 'add') {
      this.brandService.createBrand(this.brand).subscribe(() => {
        alert('Brand aggiunto con successo!');
        this.router.navigate(['/brands']);
      });
    } else if (this.mode === 'edit' && this.brandId) {
      this.brandService.updateBrand(this.brandId, this.brand).subscribe(() => {
        alert('Brand aggiornato con successo!');
        this.router.navigate(['/brands']);
      });
    }
  }
}
