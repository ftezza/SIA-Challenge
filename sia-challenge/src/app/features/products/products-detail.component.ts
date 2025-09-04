import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = signal<Product | undefined>(undefined);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product.set(this.productService.getById(id));
  }

    // Agregar producto al carrito
    addToCart(product: Product) {
      this.cartService.addItem(product);
    }
}
