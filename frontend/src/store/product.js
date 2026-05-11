import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },

  createProduct: (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.Image) {
      return { success: false, message: 'All fields are required' };
    }
    const res=await fetch("api/v1/products", {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(newProduct)
    })
    const data=await res.json();
    set((state)=>({products:[...state.products,data.data]} ));
  },
}));
