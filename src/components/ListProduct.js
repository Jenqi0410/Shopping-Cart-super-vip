import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions";
import Product from "./Product";

export default function ListProduct() {
  const products = useSelector((state) => state.listProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.length === 0) {
    return <p>Không có sản phẩm nào.</p>;
  }

  return (
    <div className="row">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}