import { createReducer, on, createAction } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },   // Initial state
  // Action
  on(createAction('[Product] Toggle Product Code'), state => {
      console.log('Original state:' + JSON.stringify(state));
    return {
      ...state,     // spread copy of the state
      showProductCode: !state.showProductCode    // make changes to that copy
    };
  })
);