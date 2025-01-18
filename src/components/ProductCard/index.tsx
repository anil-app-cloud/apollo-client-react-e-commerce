import React, {useContext} from 'react';
import { ShoppingCart } from 'lucide-react';
import { gql, useMutation } from '@apollo/client';
import { Product } from '../../types';
import { AppContext } from '../../context/myContext';
import './index.css';

interface ProductCardProps {
  product: Product;
}


export function ProductCard({ product }: ProductCardProps) {
  const {user} = useContext(AppContext)
//   console.log("user from product cart", user)
//   console.log("product from productcard", product.product_id)
  const discountedPrice = product.price -  product.discount;
  const ADD_TO_CART = gql`
    mutation AddToCart($userId: ID!, $product: inputCartProduct!) {
        addToCart(userId: $userId, product: $product){
            user_id
        }
    }
    `;
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);

  const getAddProduct = async () => {
    const userId = user.user_id 
    const addingProduct = {product_id: product.product_id, name: product.name, price: product.price, discount: product.discount}
    try {
        const response = await addToCart({
          variables: { product: addingProduct, userId },
        });
        console.log('Product added to cart:', response.data);
      } catch (err) {
        console.error('Error adding product to cart:', err);
      }
  }
  return (
    <div className="product-card">
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <div className="price-container">
          <span className="current-price">RS {discountedPrice}</span>
          {product.discount > 0 && (
            <>
              <span className="original-price">Rs {product.price}</span>
              <span className="discount-badge">{product.discount}rs off</span>
            </>
          )}
        </div>
        <button className="btn btn-primary add-to-cart-btn" onClick={getAddProduct}>
          <ShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}