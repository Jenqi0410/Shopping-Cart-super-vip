import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotify, checkoutCartApi } from "../redux/actions";

export default function Checkout() {
  const cartItems = useSelector((state) => state.listCart);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  ).toFixed(2);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleCheckout = async () => {
    if (!name || !address) {
      dispatch(showNotify("Please fill in information!", "danger"));
      return;
    }

    try {
      await dispatch(checkoutCartApi());
      setName("");
      setAddress("");
      setPaymentMethod("cash");
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-3">
        {cartItems.length === 0 ? (
          <p className="text-muted">Your shopping cart is empty</p>
        ) : (
          <div>
            <h5 className="fw-bold mb-3">Payment information</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Recipient name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Delivery address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter the Address"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="payment" className="form-label">
                  Payment method
                </label>
                <select
                  className="form-select"
                  id="payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cash">Pay when receiving goods</option>
                  <option value="credit">Credit Card</option>
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <h5>Total: {total} USD</h5>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCheckout}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}