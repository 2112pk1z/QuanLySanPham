import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductItem from './ProductItem';

const sampleProducts = [
  { id: 1, name: 'Áo thun nam', price: 200000, category: 'Thời trang', stock: 20 },
  { id: 2, name: 'Tai nghe Bluetooth', price: 500000, category: 'Công nghệ', stock: 15 },
  { id: 3, name: 'Máy xay sinh tố', price: 750000, category: 'Gia dụng', stock: 10 },
  { id: 4, name: 'Giày sneaker nữ', price: 800000, category: 'Thời trang', stock: 8 },
  { id: 5, name: 'Bàn phím cơ', price: 1200000, category: 'Công nghệ', stock: 5 },
];

function ProductList() {
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
    <div className="bg-gray-50 p-8 max-w-4xl mx-auto rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Quản lý sản phẩm</h1>

      <ProductForm onAdd={handleAdd} />

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        <div className="flex items-center">
          <label className="mr-2 text-lg text-gray-700">Lọc theo danh mục:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="w-1/2">
          <input
            type="text"
            placeholder="Tìm sản phẩm theo tên..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="border px-6 py-4 text-left">Tên sản phẩm</th>
            <th className="border px-6 py-4 text-left">Giá</th>
            <th className="border px-6 py-4 text-left">Danh mục</th>
            <th className="border px-6 py-4 text-left">Tồn kho</th>
            <th className="border px-6 py-4 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <ProductItem 
              key={product.id}
              product={product}
              onDelete={handleDelete} 
            />
          ))}
        </tbody>
      </table>

      {/* Tổng số và tổng tồn kho */}
      <div className="mt-4 text-lg font-semibold text-gray-700">
        Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
      </div>
    </div>
  );
}

export default ProductList;
