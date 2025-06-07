import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import ListProduct from "./components/ListProduct";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Notify from "./components/Notify";
import { fetchProducts } from "./redux/actions";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => dispatch(fetchProducts())} />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div className="container my-4">
              <h2 className="fw-bold mb-4">MiniProject - Shopping Cart</h2>
              <div className="row">
                <div className="col-12 col-md-7">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <strong>List Products</strong>
                    </div>
                    <div className="card-body">
                      <ListProduct />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5">
                  <div className="card">
                    <div className="card-header bg-warning text-white">
                      <strong>Your Cart</strong>
                    </div>
                    <div className="card-body">
                      <Cart />
                    </div>
                  </div>
                  <Checkout />
                </div>
              </div>
              <Notify />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}