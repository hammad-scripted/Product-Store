import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.Image) {
      return { success: false, message: 'All fields are required' };
    }
    const res = await fetch('api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 'error') {
      return { success: false, message: data.message };
    }
    set((state) => ({ products: [...state.products, data.product] }));
    return { success: true, message: 'Product created successfully' };
  },
  fetchProducts: async () => {
    const res = await fetch('api/v1/products');
    const data = await res.json();
    if (data.status === 'error') {
      set({ products: [] });
    }
    set({ products: data.products });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`api/v1/products/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.status === 'error') {
      return { success: false, message: data.message };
    }
    set((state) => ({ products: state.products.filter((p) => p._id !== id) }));
    return { success: true, message: 'Product deleted successfully' };
  },

  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.status === 'error') {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.map((p) =>
        p._id === id ? data.updatedProduct : p,
      ),
    }));
    return { success: true, message: 'Product updated successfully' };
  },
}));
