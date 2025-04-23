import React, { useState } from 'react';
import ProductForm from './ProductForm';

const sampleProducts = [
  { id: 1, name: 'Áo thun nam', price: 200000, category: 'Thời trang', stock: 20 },
  { id: 2, name: 'Tai nghe Bluetooth', price: 500000, category: 'Công nghệ', stock: 15 },
  { id: 3, name: 'Máy xay sinh tố', price: 750000, category: 'Gia dụng', stock: 10 },
  { id: 4, name: 'Giày sneaker nữ', price: 800000, category: 'Thời trang', stock: 8 },
  { id: 5, name: 'Bàn phím cơ', price: 1200000, category: 'Công nghệ', stock: 5 },
];

function ProductList() {
  // Load từ localStorage nếu có, ngược lại dùng mẫu mặc định
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('productList');
    return saved ? JSON.parse(saved) : sampleProducts;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = ['Tất cả', ...new Set(products.map(p => p.category))];

  const saveToLocalStorage = (data) => {
    localStorage.setItem('productList', JSON.stringify(data));
  };

  const handleAdd = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    saveToLocalStorage(updated);
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveToLocalStorage(updated);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <ProductForm onAdd={handleAdd} />

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="mr-2 font-medium">Lọc theo danh mục:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border px-3 py-2 rounded"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Tìm sản phẩm theo tên..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded w-1/2"
        />
      </div>

      {/* Bảng sản phẩm */}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Tên sản phẩm</th>
            <th className="border px-4 py-2">Giá</th>
            <th className="border px-4 py-2">Danh mục</th>
            <th className="border px-4 py-2">Tồn kho</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id} className="text-center">
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price.toLocaleString()} đ</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tổng số và tổng tồn kho */}
      <div className="mt-4 font-medium text-gray-700">
        Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
      </div>
    </div>
  );
}

export default ProductList;
