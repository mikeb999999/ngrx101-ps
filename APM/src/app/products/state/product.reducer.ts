import { createReducer, on, createAction } from '@ngrx/store';
import * as AppState from '../../state/app.state';

import { Product } from '../product';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer<ProductState>(
  { showProductCode: true } as ProductState,   // Initial state
  // Action
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
      console.log('Original state:' + JSON.stringify(state));
    return {
      ...state,     // spread copy of the state
      showProductCode: !state.showProductCode    // make changes to that copy
    };
  })
);