// app/category/[slug]/layout.jsx
'use client';

import Header from "@/app/components/Header/header";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react"; // Import home icon

export default function CategoryLayout({ children }) {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category fetch failed:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r border-gray-300 relative">
          {/* Categories Section */}
          <div className="p-4 pb-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-3">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((cat) => {
                const active = pathname === `/Category/${cat.slug}`;
                return (
                  <li key={cat.id}>
                    <Link
                      href={`/Category/${cat.slug}`}
                      className={`block px-3 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 ${
                        active
                          ? "bg-blue-500 text-white shadow-md"
                          : "text-gray-800 hover:text-blue-600"
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Home Button Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 w-64 p-4 bg-gray-100 border-t border-gray-300">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-full justify-center"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
