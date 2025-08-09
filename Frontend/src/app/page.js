'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from "./components/Header/header.jsx";
import CounterSection from "./components/Counter/counterSection.jsx";
import Categories from "./components/Categories/Categories.jsx";
import ReachUs from "./components/ReachUs/ReachUs.jsx";
// import Login from "./components/LogIn/login.jsx";

export default function Home() {
  // useEffect(() => {
  //   // Clear localStorage on every page load/refresh
  //   localStorage.clear();
    
  //   // Or if you want to clear only specific items:
  //   // localStorage.removeItem('cart');
    
  //   console.log('📭 localStorage cleared on page refresh');
  // }, []);

  return (
    <>
      <Header />
      <CounterSection />
      <Categories />
      <ReachUs />
    </>
  );
}