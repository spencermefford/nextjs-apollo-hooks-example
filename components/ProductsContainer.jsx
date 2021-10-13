import { gql, useQuery } from '@apollo/client';
import { cartItemsVar } from '../lib/local/vars';
import Product from './Product';

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      price
      isInCart @client
      priceWithCurrency @client
    }
  }
`;

const ProductsContainer = () => {
  const { loading, data } = useQuery(PRODUCTS_QUERY);

  const handleAddToCart = (id) => {
    const items = cartItemsVar();
    cartItemsVar([...items, id])
  }

  const handleRemoveFromCart = (id) => {
    const items = cartItemsVar();
    cartItemsVar(items.filter((item) => item !== id))
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
          margin: 25px 0;
        }
      `}</style>
      <ul>
        {data?.products?.map(product => (
          <li key={product.id}>
            <Product
              product={product}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsContainer;
