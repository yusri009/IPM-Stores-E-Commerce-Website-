'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from "./components/Header/header.jsx";
import CounterSection from "./components/Counter/counterSection.jsx";
import Categories from "./components/Categories/Categories.jsx";
import ReachUs from "./components/ReachUs/ReachUs.jsx";

export default function Home() {
  return (
    <div className='bg-blue-50'>
      <Header />
      <CounterSection />
      <Categories />
      <ReachUs />
    </div>
  );
}