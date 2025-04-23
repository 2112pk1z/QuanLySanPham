import React, { useState } from 'react';
import ProductForm from './ProductForm';

const sampleProducts = [
  { id: 1, name: 'Sữa rửa mặt', price: 120000, category: 'Chăm sóc da', stock: 10 },
  { id: 2, name: 'Dầu gội thảo dược', price: 150000, category: 'Chăm sóc tóc', stock: 5 },
];


function ProductList() {
  const [products, setProducts] = useState(sampleProducts);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAdd = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="p-4">
      <ProductForm onAdd={handleAdd} />
      <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
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
          {products.map(product => (
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
    </div>
  );
}

export default ProductList;
