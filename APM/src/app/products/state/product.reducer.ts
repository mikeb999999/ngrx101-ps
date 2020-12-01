import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';

import { Product } from '../product';
import * as ProductActions from './product.actions';

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

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  // Actions
  on(ProductActions.toggleProductCode, (state): ProductState => {
    console.log('Original state:' + JSON.stringify(state));
    return {
      ...state,     // spread copy of the state
      showProductCode: !state.showProductCode    // make changes to that copy
    };
  }),
  on(ProductActions.setCurrentProduct, (state, actionData): ProductState => {
    console.log('Original state:' + JSON.stringify(state));
    return {
      ...state,
      currentProduct: actionData.product  //use the data when transforming the state & return it to the store, don't need to spread the product instance
    };
  }),
  on(ProductActions.initialiseCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: { id: 0, productName: '', productCode: 'New', description: '', starRating: 0 }
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null
    };
  })

);