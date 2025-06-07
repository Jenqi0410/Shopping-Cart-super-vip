import React, { useState } from "react";
import axios from "axios";

function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/products", form, {
        headers: {
          Authorization: "Bearer C1ujZPHmt9Fme1osxWDzUsccj_Ehg", // token từ Postman
          "Content-Type": "application/json"
        },
      });
      alert("✅ Thêm sản phẩm thành công!");
      onProductAdded(); // gọi lại danh sách
    } catch (error) {
      console.error(error);
      alert("❌ Lỗi khi thêm sản phẩm");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-4 bg-light">
      <h4 className="mb-3">🛒 Thêm sản phẩm mới</h4>
      <input
        name="name"
        placeholder="Tên sản phẩm"
        value={form.name}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Giá (USD)"
        value={form.price}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />
      <input
        name="image"
        placeholder="Ảnh URL"
        value={form.image}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <textarea
        name="description"
        placeholder="Mô tả sản phẩm"
        value={form.description}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <button className="btn btn-success">Thêm sản phẩm</button>
    </form>
  );
}

export default AddProduct;
