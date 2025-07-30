'use client'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative">
      {/* Full search bar on medium and up */}
      <div className="hidden md:flex items-center border border-gray-300 rounded px-2 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-40"
        />
        <FaSearch className="text-gray-500 ml-2" />
      </div>

      {/* Search icon button on small screens */}
      <button
        className="md:hidden text-gray-600 text-xl"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full flex items-center justify-center p-1">
            <FaSearch />
        </div>
      </button>

      {/* Optional: Show input box when icon is clicked on mobile */}
      {isSearchOpen && (
        <input
          type="text"
          placeholder="Search..."
          className="absolute top-10 left-0 border border-gray-300 rounded px-2 py-1 w-48 bg-white shadow-md md:hidden"
        />
      )}
    </div>
  );
}
