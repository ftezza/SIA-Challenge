import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { ProductsListComponent } from './features/products/products-list.component';
import { ProductsDetailComponent } from './features/products/products-detail.component';
import { OrdersComponent } from './features/orders/orders.component';


export const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrdersComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products-list.component')
        .then(m => m.ProductsListComponent)
  },
  { path: 'products/:id', component: ProductsDetailComponent },
  { path: '**', redirectTo: '' }
];
