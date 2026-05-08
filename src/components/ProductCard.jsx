import React from 'react';
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product, onRemove }) => {
  const cardClass = !product.inStock
    ? `${styles.card} ${styles.outOfStockClass}`
    : styles.card;

  return (
    <div className={cardClass}>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <p>
        <span className={`${styles.badge} ${product.inStock ? styles.inStockBadge : styles.outOfStockBadge}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </p>
      <button className={styles.removeBtn} onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
};

export default ProductCard;
