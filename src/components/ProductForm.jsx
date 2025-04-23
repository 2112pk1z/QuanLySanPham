import React, { useState } from 'react';

function ProductForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.category && formData.stock) {
      onAdd({
        id: Date.now(),
        name: formData.name,
        price: parseInt(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
      });
      setFormData({ name: '', price: '', category: '', stock: '' });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Thêm sản phẩm mới</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          value={formData.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Tồn kho"
          value={formData.stock}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Thêm sản phẩm
      </button>
    </form>
  );
}

export default ProductForm;
