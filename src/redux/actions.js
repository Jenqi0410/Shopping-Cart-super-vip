import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SHOW_NOTIFY,
  HIDE_NOTIFY,
  UPDATE_QUANTITY,
  SET_CART,
  SET_PRODUCTS,
} from "./constants";

import * as cartApi from "../api/cartApi";

export const clearCart = () => ({ type: CLEAR_CART });

export const hideNotify = () => ({ type: HIDE_NOTIFY });

export const showNotify = (message, type = "success") => {
  return (dispatch) => {
    dispatch({ type: SHOW_NOTIFY, payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: HIDE_NOTIFY });
    }, 3000);
  };
};

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const updateQuantity = (cartId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { cartId, quantity },
});

export const removeFromCart = (cartId) => ({
  type: REMOVE_FROM_CART,
  payload: cartId,
});

export const setCart = (cartItems) => ({
  type: SET_CART,
  payload: cartItems,
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const fetchCartFromApi = () => async (dispatch) => {
  try {
    const res = await cartApi.getCart();
    dispatch(setCart(res.data));
  } catch (error) {
    console.error("Lấy giỏ hàng thất bại:", error.response ? error.response.data : error.message);
    dispatch(showNotify("Không thể tải giỏ hàng", "danger"));
  }
};

export const addToCartApi = (product) => async (dispatch) => {
  try {
    const res = await cartApi.addToCart({
      productId: product.id,
      quantity: product.quantity,
    });
    await dispatch(fetchCartFromApi());
    dispatch(showNotify(`Đã thêm ${res.data.productName} x${res.data.quantity} vào giỏ hàng`));
  } catch (err) {
    dispatch(showNotify("Thêm vào giỏ hàng thất bại", "danger"));
  }
};

export const updateQuantityApi = (cartId, quantity) => async (dispatch) => {
  try {
    console.log(`Cập nhật số lượng - cartId: ${cartId}, quantity: ${quantity}`);
    await cartApi.updateCartItem(cartId, quantity);
    await dispatch(fetchCartFromApi());
    dispatch(showNotify("Cập nhật số lượng thành công"));
  } catch (err) {
    console.error("Lỗi cập nhật số lượng:", err.response ? err.response.data : err.message);
    dispatch(showNotify("Cập nhật số lượng thất bại", "danger"));
  }
};

export const removeFromCartApi = (cartId) => async (dispatch) => {
  try {
    await cartApi.removeFromCart(cartId);
    await dispatch(fetchCartFromApi());
    dispatch(showNotify("Đã xóa sản phẩm"));
  } catch (err) {
    dispatch(showNotify("Xóa sản phẩm thất bại", "danger"));
  }
};

export const clearCartApi = () => async (dispatch) => {
  try {
    await cartApi.clearCart();
    dispatch(clearCart());
    dispatch(showNotify("Đã xóa toàn bộ giỏ hàng"));
  } catch (err) {
    dispatch(showNotify("Xóa giỏ hàng thất bại", "danger"));
  }
};

export const checkoutCartApi = () => async (dispatch) => {
  try {
    const res = await cartApi.checkoutCart();
    dispatch(clearCart());
    dispatch(showNotify("Thanh toán thành công"));
    return res.data;
  } catch (err) {
    dispatch(showNotify("Thanh toán thất bại", "danger"));
    throw err;
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await cartApi.getProducts();
    dispatch(setProducts(res.data));
  } catch (error) {
    console.error("Lấy danh sách sản phẩm thất bại:", error.response ? error.response.data : error.message);
    dispatch(showNotify("Không thể tải danh sách sản phẩm", "danger"));
  }
};