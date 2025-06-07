import axios from "axios";

const API = "http://localhost:8080/api/v1/user/cart";
const PRODUCT_API = "http://localhost:8080/api/v1/products";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getCart = () => 
  axios.get(API, { headers: getAuthHeader() });

export const addToCart = (product) => 
  axios.post(`${API}/add`, product, { headers: getAuthHeader() });

export const updateCartItem = (cartId, quantity) => 
  axios.patch(`${API}/quantity/${cartId}?quantity=${quantity}`, null, { headers: getAuthHeader() });

export const removeFromCart = (cartId) => 
  axios.delete(`${API}/delete/${cartId}`, { headers: getAuthHeader() });

export const clearCart = () => 
  axios.delete(`${API}/clear`, { headers: getAuthHeader() });

export const checkoutCart = () => 
  axios.post(`${API}/checkout`, null, { headers: getAuthHeader() });

export const getProducts = () => 
  axios.get(PRODUCT_API, { headers: getAuthHeader() });