import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  alt: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
