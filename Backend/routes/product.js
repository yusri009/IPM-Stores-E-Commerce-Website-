import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Helper function to transform MongoDB documents
const transformProduct = (product) => {
  const transformed = product.toObject();
  transformed.mongoid = transformed._id.toString();
  delete transformed._id;
  delete transformed.__v; // Remove version key too
  return transformed;
};

// Get all products with optional filters
router.get('/', async (req, res) => {
  const { category, categorySlug, search } = req.query;

  let filter = {};

  if (category) {
    filter.categorySlug = category;
  }

  if (categorySlug) {
    filter.categorySlug = categorySlug;
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  try {
    const products = await Product.find(filter);
    
    // Transform all products to use 'id' instead of '_id'
    const transformedProducts = products.map(transformProduct);
    
    res.json(transformedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Transform single product
    const transformedProduct = transformProduct(product);
    
    res.json(transformedProduct);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;

