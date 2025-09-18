'use client';
import React from 'react';
import Image from 'next/image';

export default function CategoryCard({ category, onClick }) {
  return (
    <div
      className="cursor-pointer border-2 bg-white  rounded-3xl  hover:shadow-2xl p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:border-blue-300 bg-gradient-to-br  group"
      onClick={() => onClick(category)}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4  group-hover:shadow-lg duration-300">
        <Image
          src={`/${category.image}`}
          alt={category.alt}
          width={144}
          height={144}
          className="w-36 h-36 rounded-2xl group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-xl font-bold text-blue-600">{category.name}</h3>
    </div>
  );
}


