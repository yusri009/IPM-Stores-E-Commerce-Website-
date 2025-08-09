import { CartProvider } from './components/Cart/Cart';
import { AuthProvider } from './components/Context/authContext.js'; 
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
          <CartProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
