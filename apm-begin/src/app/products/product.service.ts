import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  //productResource = httpResource<Product[]>(() => this.productsUrl, {defaultValue:[]});

  selectedProduct = signal<Product | undefined>(undefined);
  
  createProducts(){
    return httpResource<Product[]>(() => this.productsUrl, {defaultValue:[]});
  }
}
