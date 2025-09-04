import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  items = this.cartService.items;

  // Total general del carrito
  total() {
    return this.cartService.total();
  }

  increment(id: number) {
    this.cartService.increment(id);
  }

  decrement(id: number) {
    this.cartService.decrement(id);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clear() {
    this.cartService.clear();
  }

  confirmPurchase() {
    // Redirigir a la página de órdenes
    this.router.navigate(['/order']);
  }
}
