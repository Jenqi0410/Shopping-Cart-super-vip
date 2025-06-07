import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantityApi,
  removeFromCartApi,
  clearCartApi,
  fetchCartFromApi,
} from "../redux/actions";

export default function Cart() {
  const cartItems = useSelector((state) => state.listCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromApi());
  }, [dispatch]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  ).toFixed(2);

  const handleIncreaseQuantity = useCallback((cartId) => {
    const item = cartItems.find((item) => item.id === cartId);
    if (item) {
      dispatch(updateQuantityApi(cartId, item.quantity + 1));
    }
  }, [cartItems, dispatch]);

  const handleDecreaseQuantity = useCallback((cartId) => {
    const item = cartItems.find((item) => item.id === cartId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantityApi(cartId, item.quantity - 1));
    }
  }, [cartItems, dispatch]);

  const handleRemoveItem = useCallback((cartId) => {
    dispatch(removeFromCartApi(cartId));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCartApi());
  }, [dispatch]);

  const handleQuantityChange = useCallback((cartId, e) => {
    const newQuantity = parseInt(e.target.value);
    const item = cartItems.find((item) => item.id === cartId);
    if (newQuantity > 0 && newQuantity <= (item ? item.stock || 999 : 999)) {
      dispatch(updateQuantityApi(cartId, newQuantity));
    } else if (newQuantity <= 0) {
      dispatch(updateQuantityApi(cartId, 1));
    }
  }, [cartItems, dispatch]);

  return (
    <div className="card shadow-sm">
      <div className="card-body p-3">
        {cartItems.length === 0 ? (
          <p className="text-muted">Giỏ hàng của bạn trống!</p>
        ) : (
          <div>
            <table className="table table-bordered table-sm align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th>Cài đặt</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.unitPrice} USD</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          min="1"
                          max={item.stock || 999}
                          style={{ width: "60px", display: "inline-block" }}
                        />
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleIncreaseQuantity(item.id)}
                          disabled={item.quantity >= (item.stock || 999)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(item.unitPrice * item.quantity).toFixed(2)} USD</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-end fw-bold">
                    Tổng cộng:
                  </td>
                  <td className="fw-bold">{total} USD</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-warning btn-sm"
                onClick={handleClearCart}
              >
                Làm trống giỏ hàng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}