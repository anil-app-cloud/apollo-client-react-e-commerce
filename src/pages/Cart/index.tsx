import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { gql, useLazyQuery } from '@apollo/client';
import { AppContext } from '../../context/myContext';
import { useLocation } from 'react-router-dom'; 
import './index.css';

export function Cart() {
    const [mockCartItems, setMockCartItems] = useState<Product[]>([]);
    const { user } = useContext(AppContext);
    const userId = user.user_id;

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

    const [fetchCartItems, { data, loading, error, refetch }] = useLazyQuery(GET_CART_ITEMS_BY_USER);
    const location = useLocation(); 


    useEffect(() => {
        if (userId) {
            fetchCartItems({ variables: { userId } });
        }
    }, [location.pathname, userId, fetchCartItems]); 

    useEffect(() => {
        refetch()
    }, [])
    useEffect(() => {
        if (data) {
            setMockCartItems(data.getCartItemsByUser);
        }
    }, [data]);

    if (loading) return <p>Loading cart items...</p>;
    if (error) return <p>Error fetching cart items: {error.message}</p>;

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
                    <button className="btn btn-primary checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}
