import { Injectable, signal, WritableSignal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Notebook Lenovo', category: 'Tecnología', price: 1200 },
    { id: 2, name: 'Auriculares Sony', category: 'Tecnología', price: 200 },
    { id: 3, name: 'Zapatillas Nike', category: 'Deportes', price: 150 },
    { id: 4, name: 'Camiseta Boca Juniors', category: 'Deportes', price: 80 },
    { id: 5, name: 'Cafetera Philips', category: 'Hogar', price: 300 },
    { id: 6, name: 'Lámpara LED', category: 'Hogar', price: 40 },
  ]);

  getAllSignal(): WritableSignal<Product[]> {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
