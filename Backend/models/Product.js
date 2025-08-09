import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  image: String,
  description: String,
  categorySlug: String,
  quantity: { type: Number, default: 1 },
});

export default mongoose.model('Product', productSchema);
