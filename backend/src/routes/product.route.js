import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from '../controllers/product.controller.js';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProductById);
router.put('/products/:id', updateProductById);

export default router;
