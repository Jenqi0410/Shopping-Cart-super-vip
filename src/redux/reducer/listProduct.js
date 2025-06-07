import { SET_PRODUCTS } from "../constants";

const initialState = [];

const listProduct = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};

export default listProduct;