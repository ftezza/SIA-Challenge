import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { provideRouter } from '@angular/router';
import { Product } from '../../core/services/product.service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    //Configuramos un producto de prueba
    component.product = { id: 1, name: 'Test', category: 'Test', price: 100 } as Product;
    
    fixture.detectChanges();
  });

  it('Creacion de componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia emitir un evento cuando se llama a addtocart', () => {
    spyOn(component.add, 'emit');
    component.addToCart();
    expect(component.add.emit).toHaveBeenCalledWith(component.product);
  });
});