import React, { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Laptop', price: '$999', inStock: true },
  { id: 2, name: 'Phone', price: '$699', inStock: false },
  { id: 3, name: 'Tablet', price: '$499', inStock: true },
];

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('all');

  const filteredProducts = products.filter((p) => {
    if (filter === 'inStock') return p.inStock;
    if (filter === 'outOfStock') return !p.inStock;
    return true;
  });

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="dashboard">
      <h1>Product Dashboard</h1>
      <div className="filterBar">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('inStock')}>In Stock</button>
        <button onClick={() => setFilter('outOfStock')}>Out of Stock</button>
      </div>
      <ProductList products={filteredProducts} onRemove={handleRemove} />
    </div>
  );
};

export default App;
