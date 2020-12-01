import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{product: Product}>()  // properties = structure & type of associated data
);

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
);

export const initialiseCurrentProduct = createAction(
    '[Product] Initialise Product Code'
);

export const loadProducts = createAction(
    '[Product] Load'
  );
  
  export const loadProductsSuccess = createAction(
    '[Product] Load Success',
    props<{ products: Product[] }>()
  );
  
  export const loadProductsFailure = createAction(
    '[Product] Load Fail',
    props<{ error: string }>()
  );