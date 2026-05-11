import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';
export const createProduct = async (req, res) => {
  try {
    const { name, price, Image } = req.body;

    if (!name || !price || !Image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({
        message: 'Product with this name already exists',
        status: 'error',
      });
    }

    if (isNaN(price)) {
      return res
        .status(400)
        .json({ message: 'Price must be a number', status: 'error' });
    }

    const product = await Product.create({
      name,
      price,
      Image,
    });
    return res.status(201).json({
      message: 'Product created successfully',
      product,
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating product',
      error: error.message,
      status: 'error',
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found', status: 'error' });
    }
    return res.status(200).json({
      message: 'Products fetched successfully',
      products,
      status: 'success',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching products', error, status: 'error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: 'Product not found', status: 'error' });
    } else {
      return res.status(200).json({
        message: 'Product fetched successfully',
        product,
        status: 'success',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching product', error, status: 'error' });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: 'Product not found', status: 'error' });
    }
    return res
      .status(200)
      .json({ message: 'Product deleted successfully', status: 'success' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting product', error, status: 'error' });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: 'Id is not valid',
      status: 'error',
    });
  }

  if (Object.keys(product).length === 0) {
    return res.status(400).json({
      message: 'Please provide data to update',
      status: 'error',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
        status: 'error',
      });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      updatedProduct,
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};
