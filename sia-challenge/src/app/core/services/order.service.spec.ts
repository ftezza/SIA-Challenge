import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from './product.service';

describe('CartService', () => {
  let service: CartService;
  const mockProduct: Product = { id: 1, name: 'Notebook Lenovo', category: 'Tecnología', price: 1200 };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un producto al carrito', () => {
    service.addItem(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.name).toBe('Notebook Lenovo');
  });

  it('debería eliminar un producto del carrito', () => {
    service.addItem(mockProduct);
    service.removeItem(mockProduct.id);
    expect(service.items().length).toBe(0);
  });

  it('debería vaciar el carrito', () => {
    service.addItem(mockProduct);
    service.clear();
    expect(service.items().length).toBe(0);
  });

  it('debería calcular el total correctamente', () => {
    service.addItem(mockProduct);
    service.addItem({ id: 2, name: 'Auriculares Sony', category: 'Tecnología', price: 200 });
    expect(service.total()).toBe(1400);
  });
});