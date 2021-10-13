import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product, onAddToCart, onRemoveFromCart }) => {
  const { id, name, priceWithCurrency, isInCart } = product;

  return (
    <div className="product-wrapper">
      <style jsx>
        {`
        .product-wrapper {
          margin-bottom: 5px;
          border: 1px solid #ccc;
          padding: 3px;
        }
        button {
          margin-top: 2px;
          cursor: pointer;
        }
      `}

      </style>
      <p>
        {name}: {priceWithCurrency}
      </p>
      {isInCart && <p>In your cart!</p>}
      {' '}
      {!isInCart && <button
        title="Add To Cart"
        type="button"
        onClick={() => {
          onAddToCart(id);
        }}
      >
        add to cart
      </button>}
      {isInCart && <button
        title="Remove From Cart"
        type="button"
        onClick={() => {
          onRemoveFromCart(id);
        }}
      >
        remove from cart
      </button>}
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default Product;
