import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onRemove }) => {
  if (!products || products.length === 0) {
    return <p className="emptyMessage">No products available</p>;
  }

  return (
    <div className="productGrid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default ProductList;
