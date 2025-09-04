import { Component, computed, inject, signal } from '@angular/core';
import { Product, ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [FormsModule,CommonModule,NgFor, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  private productsService = inject(ProductService);
  private cartService = inject(CartService);

  // Signal con todos los productos
  products = this.productsService.getAllSignal();

  searchTerm = signal('');
  selectedCategory = signal('');
  maxPrice = signal<number | undefined>(undefined);

  // Computed para categorías únicas
  categories = computed(() => [...new Set(this.products().map(p => p.category))]);

  constructor(){
    
  }

  // Computed para productos filtrados
  filteredProducts = computed(() =>
    this.products().filter(p =>
      (!this.searchTerm() || p.name.toLowerCase().includes(this.searchTerm().toLowerCase())) &&
      (!this.selectedCategory() || p.category === this.selectedCategory()) &&
      (!this.maxPrice() || p.price <= this.maxPrice()!)
    )
  );

  // Agregar producto al carrito
  addToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
