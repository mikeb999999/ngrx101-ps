import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
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

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getcurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  // Action
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
      console.log('Original state:' + JSON.stringify(state));
    return {
      ...state,     // spread copy of the state
      showProductCode: !state.showProductCode    // make changes to that copy
    };
  })
);