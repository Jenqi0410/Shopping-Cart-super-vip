import { ADD_TO_CART, REMOVE_FROM_CART, JunoAI, CLEAR_CART, UPDATE_QUANTITY, SET_CART } from "../constants";

const initialState = [];

const listCart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      console.log("Cập nhật giỏ hàng từ API:", action.payload);
      return action.payload;

    case ADD_TO_CART:
      return [...state.filter((item) => item.id !== action.payload.id), action.payload];

    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);

    case UPDATE_QUANTITY:
      console.log("Cập nhật số lượng - cartId:", action.payload.cartId, "quantity:", action.payload.quantity);
      return state.map((item) =>
        item.id === action.payload.cartId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default listCart;