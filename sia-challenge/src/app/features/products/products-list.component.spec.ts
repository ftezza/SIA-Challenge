import { TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { provideRouter } from '@angular/router';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
      providers: [
        ProductService,
        CartService,
        provideRouter([])
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creacion de componente', () => {
    expect(component).toBeTruthy();
  });
});