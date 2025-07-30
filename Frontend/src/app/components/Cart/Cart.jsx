'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart && savedCart !== 'undefined' && savedCart !== 'null') {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear invalid data and start fresh
      localStorage.removeItem('cart');
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (product) => {
    console.log('🎯 ADD TO CART:', product);

    // Handle different ID field names
    const productId = product.id;
    
    // if (!productId) {
    //   console.error('❌ No product ID found');
    //   return;
    // }

    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => Number(item.id) === Number(productId));
    console.log(productId, existingItem);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({
        id: Number(productId),
        name: product.name || 'Unknown Product',
        price: Number(product.price) || 0,
        image: product.image || '',
        category: product.category || '',
        quantity: 1
      });
    }

    console.log('🛒 Updated cart:', updatedCart);
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    console.log('🗑️ REMOVE FROM CART:', productId);
    const updatedCart = cart.filter(item => Number(item.id) !== Number(productId));
    console.log('🛒 Cart after removal:', updatedCart);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const openCart = () => {
    setIsCartOpen(true);
    console.log('🛒 Cart opened');
  };
  
  const closeCart = () => {
    setIsCartOpen(false);
    console.log('🛒 Cart closed');
  };
  
  const clearCart = () => {
    setCart([]);
    console.log('🗑️ Cart cleared');
  };

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalItems,
      getTotalPrice,
      getQuantity,
      openCart,
      closeCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};