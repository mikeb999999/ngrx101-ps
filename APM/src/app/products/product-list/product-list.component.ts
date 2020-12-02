import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import * as ProductActions from '../state/product.actions';
import { Store } from '@ngrx/store';
import { getCurrentProduct, getProducts, getShowProductCode, getError, State } from '../state/product.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  // Used to highlight the selected product in the list
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.products$ = this.store.select(getProducts);

    this.errorMessage$ =  this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.displayCode$ = this.store.select(getShowProductCode);
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
