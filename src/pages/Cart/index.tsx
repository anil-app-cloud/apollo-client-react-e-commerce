import React, {useContext, useEffect} from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { gql, useLazyQuery, useSubscription } from '@apollo/client';
import { AppContext } from '../../context/myContext';
import './index.css';


let mockCartItems: Product[] = [
  {
    product_id: '1',
    name: 'Wireless Headphones',
    price: 199,
    discount: 15,
  },
  {
    product_id: '2',
    name: 'Smartphone',
    price: 899,
    discount: 10,
  },
];



export function Cart() {
    const {user} = useContext(AppContext)
    const userId = user.user_id
   


    const GET_CART_ITEMS_BY_USER = gql`
    query GetCartItemsByUser($userId: ID!) {
        getCartItemsByUser(userId: $userId) {
        discount
        name
        price
        product_id
        }
    }
    `;
    const [fetchCartItems, { data, loading, error }] = useLazyQuery(GET_CART_ITEMS_BY_USER);

    useEffect(() => {
        fetchCartItems({ variables: { userId } });
      }, [userId, fetchCartItems]);
    
    if (loading) return <p>Loading cart items...</p>;
    if (error) return <p>Error fetching cart items: {error.message}</p>;
    if (data){
        console.log("data from userCart ", data.getCartItemsByUser)
        mockCartItems = data.getCartItemsByUser
    }
      

    const total = mockCartItems.reduce((sum, item) => {
        const discountedPrice = item.price - (item.price * item.discount) / 100;
        return sum + discountedPrice;
    }, 0);

    if (mockCartItems.length === 0) {
        return (
        <div className="empty-cart">
            <ShoppingCart size={48} />
            <p>Your cart is empty</p>
        </div>
        );
    }

    return (
        <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-items">
            {mockCartItems.map((item) => (
            <div key={item.product_id} className="cart-item">
                <div className="cart-item-info">
                <h3>{item.name}</h3>
                <div className="price-container">
                    <span className="current-price">
                    Rs{item.price - (item.price * item.discount) / 100}
                    </span>
                    {item.discount > 0 && (
                    <>
                        <span className="original-price">Rs{item.price}</span>
                        <span className="discount-badge">{item.discount}% off</span>
                    </>
                    )}
                </div>
                </div>
            </div>
            ))}
            <div className="cart-total">
            <div className="cart-total-row">
                <span className="total-label">Total</span>
                <span className="total-amount">Rs{total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary checkout-btn">
                Proceed to Checkout
            </button>
            </div>
        </div>
        </div>
    );
}