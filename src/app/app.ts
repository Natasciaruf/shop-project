import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Brands } from './brands/brands';
// import { ProductList } from "./product-list/product-list";
import { BackofficeForm } from './backoffice-form/backoffice-form';
import { Backoffice } from './backoffice/backoffice';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Footer,  HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shop_frontend');
}
