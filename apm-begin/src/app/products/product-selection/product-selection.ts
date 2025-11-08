import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { computeMsgId } from '@angular/compiler';
import { ProductService } from '../product.service';
import { ReviewList } from "../../reviews/review-list/review-list";

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, ReviewList],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  private productService = inject(ProductService);


  selectedProduct = this.productService.selectedProduct;
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  //products = signal(ProductData.products);

  products = this.productService.createProducts().value;
  isLoading = this.productService.createProducts().isLoading;
  error = this.productService.createProducts().error;
  errorMessage = computed(() => this.error()? this.error()?.message : '');

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  onIncrease(){
    this.quantity.update(q => q+1);
  }

  onDecrease(){
    this.quantity.update(q => q <= 0 ? 0 : q-1);
  }

  qtyEffect = effect(() => console.log('quantity', this.quantity()));

}
