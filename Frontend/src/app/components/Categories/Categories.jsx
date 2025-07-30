'use client';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard/CategoryCard.jsx';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

 const handleCategoryClick = (category) => {
  router.push(`/Category/${category.slug}`);
  };
  

  return (
    <main className="p-8">
      <h1 className="subheading">Shop by Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} onClick={handleCategoryClick} />
        ))}
      </div>

      {selectedCategory && (
        <p className="mt-4 text-lg">You selected: {selectedCategory.name}</p>
      )}
    </main>
  );
}
