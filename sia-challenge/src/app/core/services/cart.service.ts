import { Injectable, signal } from '@angular/core';
import { Product } from './product.service';


export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  constructor() { }

  addItem(product: Product) {
    const current = this._items();
    const index = current.findIndex((i) => i.product.id === product.id);

    if (index > -1) {
      // Si ya existe el producto, incrementamos cantidad
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      this._items.set(updated);
    } else {
      // Nuevo producto en el carrito
      this._items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeItem(productId: number) {
    this._items.set(this._items().filter((i) => i.product.id !== productId));
  }

  clear() {
    this._items.set([]);
  }

  increment(productId: number) {
    this._items.update((items) =>
      items.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }

  decrement(productId: number) {
    this._items.update((items) =>
      items
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0) // lo elimina si llega a 0
    );
  }

  total() {
    return this._items().reduce(
      (acc, i) => acc + i.product.price * i.quantity,
      0
    );
  }

  count() {
    return this._items().reduce((acc, i) => acc + i.quantity, 0);
  }
}
