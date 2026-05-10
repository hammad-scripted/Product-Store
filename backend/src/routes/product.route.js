import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProduct);

export default router;
