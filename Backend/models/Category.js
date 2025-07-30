import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  alt: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
