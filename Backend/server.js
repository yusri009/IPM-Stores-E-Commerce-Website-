import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Import CORS
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import UserRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for frontend requests (adjust the origin as needed)
app.use(cors({
  origin: 'http://localhost:3000', // ⬅️ Frontend URL (React dev server)
  credentials: true
}));

app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log("✅ MongoDB Connected");
    console.log("📦 Connected to DB:", conn.connection.name);
  })
  .catch((err) => console.error("❌ Mongo Error:", err));

// ✅ API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', UserRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});