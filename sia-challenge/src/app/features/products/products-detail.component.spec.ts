import { TestBed } from '@angular/core/testing';
import { ProductsDetailComponent } from './products-detail.component';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';

describe('ProductsDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailComponent, CommonModule],
      providers: [
        ProductService,
        CartService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        }
      ]
    }).compileComponents();
  });

  it('debería cargar el producto correcto según el id', () => {
    const fixture = TestBed.createComponent(ProductsDetailComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const product = component.product();
    expect(product).toBeDefined();
    expect(product?.id).toBe(1);
  });
});