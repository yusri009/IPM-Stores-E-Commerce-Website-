'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { TiShoppingCart } from "react-icons/ti";
import { IoCartSharp, IoLogOutOutline } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import SearchBar from '../SearchBar/searchBar';
import { useCart } from '../Cart/Cart.jsx';
import ShowCart from '../Cart/ShowCart.jsx';
import { useAuth } from '../../components/Context/authContext';


function Header() {
  const { getTotalItems, openCloseCart, isCartOpenClose } = useCart();
  const totalItems = getTotalItems();
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, user} = useAuth();


  function handleLogInClick(){
    router.push('/LogIn')
  }
  function handleLogOutClick(){
    setIsLoggedIn(false);
    localStorage.clear();
    router.push('/ ')
  }

  return (
    <>
      <header className={`relative flex justify-between items-center p-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg ${isCartOpenClose ? "mr-80" : "mr-0"} transition-all duration-300`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        
        {/* Logo Section */}
        <div className="relative flex items-center min-w-0 cursor-pointer group" onClick={() => router.push('/')} >
          <TiShoppingCart className="text-4xl sm:text-5xl mx-2 shrink-0 group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
          <div className='text-center'>
            <h1 className="text-2xl sm:text-3xl font-bold truncate bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              IPM Stores
            </h1>
            <p className="text-sm sm:text-base font-medium text-blue-100 drop-shadow-sm">
              Your Everyday Grocery Partner
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="relative flex items-center min-w-0">
          {isLoggedIn && (
            <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <h2 className="text-sm font-medium text-blue-100">
                Welcome, <span className="text-white font-semibold">{user.userName}</span>!
              </h2>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="relative flex w-auto sm:w-3/5 gap-3 sm:gap-4 items-center justify-end">
          <SearchBar />

          {/* Cart Icon - Only show if signed in */}
          {isLoggedIn && (
            <div className="relative group">
              <div 
                className="h-10 w-10 sm:h-12 sm:w-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg border border-white/20"
                onClick={openCloseCart}
              >
                <IoCartSharp className="text-blue-800 text-xl sm:text-2xl" />
              </div>
              
              {/* Cart Counter Badge */}
              {totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg border-2 border-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </div>
              )}
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Shopping Cart
              </div>
            </div>
          )}

          {/* Authentication Button */}
          <div className="relative group">
            {isLoggedIn ? 
                <div onClick={handleLogOutClick} className="h-10 w-10 sm:h-12 sm:w-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-red-50 hover:scale-105 transition-all duration-200 shadow-lg border border-white/20">
                  <IoLogOutOutline className="text-red-600 text-xl sm:text-2xl" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Sign Out
                  </div>
                </div>
                :
                <div onClick={handleLogInClick} className="h-10 w-10 sm:h-12 sm:w-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-green-50 hover:scale-105 transition-all duration-200 shadow-lg border border-white/20">
                  <BsPersonFill className="text-green-600 text-xl sm:text-2xl" />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Sign In
                  </div>
                </div>
            }
          </div>
        </div>
      </header>

      {/* Cart Modal - Only show if signed in */}
      <ShowCart />
    </>
  );
}

export default Header;