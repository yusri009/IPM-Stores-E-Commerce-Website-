'use client';
import { useCart } from './Cart';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../Context/authContext';

export default function ShowCart() {
  const { 
    cart, 
    openCloseCart,
    isCartOpenClose,  
    removeFromCart, 
    addToCart,
    // updateQuantity,
    getTotalItems, 
    getTotalPrice,
    clearCart
  } = useCart();
  const {user} = useAuth();
  console.log(cart)
  if (!isCartOpenClose) return null;

  return (
    <>
      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col border-l-4 border-blue-500 ${isCartOpenClose ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
          </div>
          <button
            onClick={openCloseCart}
            className="p-2 hover:bg-red-100 rounded-full transition-colors group"
          >
            <X size={20} className="group-hover:text-red-600 text-red-400" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <ShoppingCart size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some products to get started!</p>
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600 font-semibold">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              





              <div className="space-y-3">
                {cart.map(item => {
                  console.log("item",item)
                  const itemTotal = item.productId.price * item.quantity;  
                  
                  const handleAddToCart = () => {
                    addToCart(item.productId._id);
                  };
                  const handleRemoveFromCart = () => {
                    removeFromCart(item.productId._id)
                  }
                  return (
                    <div key={item._id} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-lg transition-all bg-white">
                      {/* Product Image */}
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.productId.image} 
                            alt={item.productId.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-xs">No Image</span>
                        )}
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate text-sm">{item.productId.name}</h3>
                        <p className="text-green-600 font-bold text-sm">{item.productId.price} LKR</p>
                        <p className="text-xs text-gray-500">
                          Subtotal: {itemTotal} LKR
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={handleRemoveFromCart}
                            className="p-1 text-blue-900 rounded-full border-2 transition-colors font-bold hover:text-blue-300"
                          >
                            <Minus size={12} />
                          </button>
                          
                          <span className="font-bold w-8 text-center text-sm bg-gray-100 py-1 rounded text-green-400">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={handleAddToCart}
                            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t bg-white">
            <div className="space-y-3">
              {/* Total Summary */}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">{getTotalPrice()} LKR</span>
              </div>
              
              <div className="text-xs text-gray-600 text-center">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} • {cart.length} {cart.length === 1 ? 'product' : 'products'}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-xs"
                >
                  Clear
                </button>
                
                <button 
                  className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-xs"
                  onClick={() => {
                    alert('Checkout functionality coming soon!');
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}