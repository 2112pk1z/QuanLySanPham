import React from 'react';

function ProductItem({ product, onDelete }) {
  return (
    <tr className="hover:bg-gray-100 transition-all">
      <td className="border px-6 py-4">{product.name}</td>
      <td className="border px-6 py-4">{product.price.toLocaleString()} đ</td>
      <td className="border px-6 py-4">{product.category}</td>
      <td className="border px-6 py-4">{product.stock}</td>
      <td className="border px-6 py-4 text-center">
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
