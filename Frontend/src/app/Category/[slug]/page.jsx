'use client';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '../../components/Cart/Cart.jsx';

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  
  const { cart, addToCart,removeFromCart, getQuantity, getTotalItems, openCloseCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?categorySlug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading products...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-green-600 text-center">
        {products[0]?.categoryName || 'Products'}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const quantity = getQuantity(product._id); // Clean and simple!
          
          const handleAddToCart = () => {
            addToCart(product._id);
          };
          const handleRemoveFromCart = () => {
            removeFromCart(product._id)
          }
          
          return (
            <div 
              key={product._id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="h-48 relative overflow-hidden bg-gray-100">
                {product.image ? (
                  <Image
                    src={`/${product.image}`}
                    alt={product.name || 'Product image'}
                    fill
                    className=" group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Stock badge */}
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  In Stock
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-6">
                <h2 className="font-bold text-lg mb-2 text-gray-800  transition-colors duration-300">
                  {product.name}
                </h2>
                
                <p className="text-2xl font-bold text-green-600 mb-4 group-hover:text-green-400">
                  {product.price} LKR
                </p>
                
                {/* Add to Cart / Quantity Controls */}
                <div className="flex items-center justify-center">
                  {quantity === 0 ? (
                    <button
                      onClick={handleAddToCart} // Clean!
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                      <button
                        onClick={handleRemoveFromCart} // Clean!
                        className="p-1 text-blue-900 rounded-full border-2 transition-colors font-bold hover:text-blue-300"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="font-bold text-lg min-w-[2rem] text-center text-gray-800">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={handleAddToCart} // Clean!
                        className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <div 
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl cursor-pointer hover:bg-green-600 transition-colors"
          onClick={openCloseCart}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <span className="font-bold">
              {getTotalItems()} items
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
