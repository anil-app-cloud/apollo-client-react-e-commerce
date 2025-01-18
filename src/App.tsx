import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSubscription, gql } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

// Subscription query
const PRODUCT_UPDATE_SUBSCRIPTION = gql`
  subscription OnProductUpdate {
    productUpdate {
      name
      price
      discount
    }
  }
`;

function App() {
  const { data, error, loading } = useSubscription(PRODUCT_UPDATE_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription data received:', subscriptionData);
      if (subscriptionData.data) {
        const product = subscriptionData.data.productUpdate;
        console.log('Product update:', product);
        toast.success(`New product added: ${product.name} (₹${product.price})`);
      }
    },
    onError: (error) => {
      console.error('Subscription error details: --->', error);
      toast.error(`Subscription error: ${error.message}`);
    }
  });

  useEffect(() => {
    if (loading) {
      console.log('Subscription connecting...');
    }
    if (data) {
      console.log('Subscription data received:', data);
    }
    if (error) {
      console.log('Error occurred:', error);
    }
  }, [loading, error, data]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
