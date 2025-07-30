import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  price: Number,
  image: String,
  description: String,
  categorySlug: String
});

export default mongoose.model('Product', productSchema);
