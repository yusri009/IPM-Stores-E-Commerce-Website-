import express from 'express';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt'; 


const router = express.Router();
router.post('/', async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const newUser = new UserModel({ userName, email, password });
    await newUser.save();
    res.json({message:"Sign up Successs", newUser:newUser});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.userName !== userName) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    // Compare passwords (use bcrypt if you hash passwords — optional for now)
    const isMatch = await bcrypt.compare(password, user.password); // use bcrypt.compare(password, user.password) if hashed

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Successful login
    res.json({ message: 'Login successful', user: { userName: user.userName, email: user.email, id: user._id, selectedProducts:user.selectedProducts } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add-to-cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingProduct = user.selectedProducts.find(p =>
      p.productId.toString() === productId
    );

    if (existingProduct) {
      // Update quantity
      existingProduct.quantity += 1;
    } else {
      // Add new product
      user.selectedProducts.push({ productId });
    }

    await user.save();
    res.json({ message: 'Product added to cart', cart: user.selectedProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/remove-from-cart', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingProduct = user.selectedProducts.find(p =>
      p.productId.toString() === productId
    );

    if (existingProduct.quantity > 1){
      existingProduct.quantity -= 1;
    }
    else{
      user.selectedProducts = user.selectedProducts.filter(p =>
      p.productId.toString() !== productId
    );
    }
    

    await user.save();
    res.json({ message: 'Product removed from cart', cart: user.selectedProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /get-cart
router.post('/get-cart', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModel.findById(userId).populate('selectedProducts.productId').exec();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ cart: user.selectedProducts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/clear-cart', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.selectedProducts = [];
    await user.save();
    res.json({ message: 'cart is cleared'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router;

