'use client';
import React from 'react';
import { TiShoppingCart } from "react-icons/ti";
import { IoCartSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import SearchBar from '../SearchBar/searchBar';
import { useCart } from '../Cart/Cart.jsx';
import ShowCart from '../Cart/ShowCart.jsx';

function Header() {
  const { getTotalItems, openCart, isCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      <header className={`flex justify-between items-center p-4 bg-blue-800 text-white ${isCartOpen ? "mr-80" : "mr-0"}`}>
        <div className="flex items-center min-w-0">
          <TiShoppingCart className="text-4xl sm:text-5xl mx-2 shrink-0" />
          <div className='text-center'>
            <h1 className="text-2xl sm:text-3xl font-bold truncate">IPM Stores</h1>
            <p className="text-sm sm:text-base-100 font-medium text-gray-200">Your Everyday Grocery Partner</p>
          </div>
        </div>

        <div className="flex w-auto sm:w-3/5 gap-2 sm:gap-3 items-center justify-end">
          <SearchBar />

          {/* Cart Icon - Only show if signed in */}
          {(
            <div className="relative">
              <div 
                className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={openCart}
              >
                <IoCartSharp className="text-blue-800 text-xl sm:text-3xl" />
              </div>
              
              {/* Cart Counter Badge */}
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </div>
              )}
            </div>
          )}

          {/* Authentication - Replace Person Icon */}
          <div className="flex items-center">
            {
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full flex items-center justify-center p-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <BsPersonFill className="text-blue-800 text-xl sm:text-3xl" />
                </div>
            }
          </div>
        </div>
      </header>

      {/* Cart Modal - Only show if signed in */}
      { <ShowCart />}
    </>
  );
}

export default Header;