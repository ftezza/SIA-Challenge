import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartService = inject(CartService);
  constructor() {}

  placeOrder(): Promise<string> {
    const items = this.cartService.items();

    return new Promise((resolve, reject) => {
      if (items.length === 0) {
        reject('El carrito está vacío');
        return;
      }

      // Simulación de retraso
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% éxito
        if (success) {
          resolve('Pedido confirmado con éxito');
        } else {
          reject('Hubo un error al procesar el pedido');
        }
      }, 1000);
    });
  }
}
