import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import * as ProductActions from '../state/product.actions';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { getCurrentProduct, getShowProductCode, productReducer, State } from '../state/product.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    // TODO: Unsubscribe  
    this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // TODO: Unsubscribe
    this.store.select(getShowProductCode).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    // Now dispatching our strongly-typed action:
    this.store.dispatch(
      ProductActions.toggleProductCode()
    );
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initialiseCurrentProduct())
  }

  // An example with data
  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ product })
    );
  }

}
