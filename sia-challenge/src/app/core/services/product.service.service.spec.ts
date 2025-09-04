import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver todos los productos desde getAllSignal()', () => {
    const products = service.getAllSignal()();
    expect(products.length).toBe(6);
    expect(products[0].name).toBe('Notebook Lenovo');
  });

  it('debería devolver un producto por ID válido', () => {
    const product = service.getById(2);
    expect(product).toBeDefined();
    expect(product?.name).toBe('Auriculares Sony');
  });

  it('debería devolver undefined para un ID inexistente', () => {
    const product = service.getById(999);
    expect(product).toBeUndefined();
  });

  it('debería reaccionar cuando se agregan productos dinámicamente', () => {
    const productsSignal = service.getAllSignal();

    productsSignal.update(current => [
      ...current,
      { id: 7, name: 'Smartwatch Samsung', category: 'Tecnología', price: 500 }
    ]);

    const updatedProducts = productsSignal();
    expect(updatedProducts.length).toBe(7);
    expect(updatedProducts[6].name).toBe('Smartwatch Samsung');
  });

  it('debería permitir resetear la lista con set()', () => {
    const productsSignal = service.getAllSignal();

    productsSignal.set([
      { id: 99, name: 'Producto Test', category: 'Test', price: 999 }
    ]);

    const products = productsSignal();
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(99);
  });
});