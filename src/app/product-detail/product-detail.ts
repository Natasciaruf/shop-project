import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
   providers: [ApiService]
})
export class ProductDetail implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
this.productsService.getProductByid(id).subscribe((response) => {
  this.product = response.data
})

  }
}
