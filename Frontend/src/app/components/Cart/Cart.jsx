'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/Context/authContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpenClose, setIsCartOpenClose] = useState(false);
  const {user, setUser, isLoggedIn} = useAuth();
  // const storedUser = localStorage.getItem('user');
  // console.log("userId: "+storedUser)

  // ✅ safely fetch user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("userId: "+storedUser)
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log(user.id)
        if (user.id) {
          setUser(user);
          console.log("✅ Fetched userId from localStorage:", user.id);
        }
      } catch (error) {
        console.error("❌ Failed to parse user:", error);
      }
    }
  }, []);

  // ✅ define fetchCart function outside useEffect so it can be reused
  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await axios.post('http://localhost:5000/api/users/get-cart', { userId:user.id });
      setCart(res.data.cart);
      console.log("🛒 Cart fetched:", res.data.cart);
    } catch (err) {
      console.error('❌ Error fetching cart:', err.message);
    }
  };

  // ✅ fetch cart only after userId is available
  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = (productId) => {
    if (!isLoggedIn) {
      toast.error('Please log in to add items to cart');
      return;
    }

    axios.post('http://localhost:5000/api/users/add-to-cart', { userId:user.id, productId })
      .then(res => {console.log(res);
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  const removeFromCart = (productId) => {
    if (!user.id) {
      toast.error('Please log in to remove items from cart');
      return;
    }

    axios.post('http://localhost:5000/api/users/remove-from-cart', { userId:user.id, productId })
      .then(result => {console.log(result);
        fetchCart();
      })
      .catch(err => console.log(err));
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
  const getQuantity = (productId) => cart.find(item => item.productId._id === productId)?.quantity || 0;

  const openCloseCart = () => setIsCartOpenClose(!isCartOpenClose);


  const clearCart = () => {
     axios.post('http://localhost:5000/api/users/clear-cart', { userId:user.id })
      .then(result => {console.log(result);
        fetchCart();
      })
      .catch(err => console.log(err));
    setCart([]);
    localStorage.clear('cart');
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpenClose,
      addToCart,
      removeFromCart,
      getTotalItems,
      getTotalPrice,
      getQuantity,
      openCloseCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
