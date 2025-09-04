import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,NgIf,NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  items = this.cartService.items;
  total = () => this.cartService.total();

  loading = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  confirmOrder() {
    this.loading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.orderService.placeOrder()
      .then(msg => {
        this.successMessage.set(msg);
        this.cartService.clear(); // vaciar carrito al confirmar
      })
      .catch(err => {
        this.errorMessage.set(err);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
