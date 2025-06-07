import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartApi, showNotify } from "../redux/actions";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm d-flex flex-row">
        <div className="col-4 d-flex align-items-center justify-content-center bg-light">
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ maxWidth: "100%", height: "auto" }} />
          ) : (
            <span className="text-muted">Không có ảnh</span>
          )}
        </div>

        <div className="col-8 d-flex flex-column justify-content-between p-3">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-muted">Tồn kho: {product.stock}</p>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor={`quantity-${product.id}`} className="form-label me-2">
              Số lượng
            </label>
            <input
              type="number"
              id={`quantity-${product.id}`}
              className="form-control w-auto"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock}
              style={{ width: "60px", display: "inline-block" }}
              disabled={product.stock === 0}
            />
          </div>

          <h5 className="fw-bold">{totalPrice} USD</h5>

          <button
            className="btn btn-primary w-100"
            onClick={() => {
              dispatch(addToCartApi({ id: product.id, quantity }));
              dispatch(showNotify(`Đã thêm ${product.name} x${quantity} vào giỏ hàng!`));
            }}
            disabled={product.stock === 0}
          >
            Thêm vào giỏ - {product.price} USD
          </button>
        </div>
      </div>
    </div>
  );
}