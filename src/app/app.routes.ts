import { Routes } from '@angular/router';
import { Home } from './home/home';
// import { ProductList } from './product-list/product-list';
import { Backoffice } from './backoffice/backoffice';
import { BackofficeForm } from './backoffice-form/backoffice-form';
import { ProductDetail } from './product-detail/product-detail';
import { Brands } from './brands/brands';
import { BrandFormComponent } from './brands-form.ts/brands-form';

export const routes: Routes = [
{path: '', component: Home },
// {path: 'products', component: ProductList},
{path: 'backoffice', component: Backoffice},
{path: 'backoffice/products/add', component: BackofficeForm},
{path: 'backoffice/products/edit/:id', component: BackofficeForm},
{ path: 'backoffice/products/:id', component: ProductDetail },
{ path: 'brands', component: Brands },
{path: 'brands/edit/:id', component: BrandFormComponent},
{path: 'brands/add', component: BrandFormComponent}
];
