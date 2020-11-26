import { ProductState } from '../products/state/product.reducer';

export interface State {
   // products: ProductState,   not within lazy loading boundary :(
    user: any;
  }