import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // Add item to cart
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (i) => i.id === item.id && i.size === item.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) } // Ensure quantity updates properly
                  : i
              ),
            };
          } else {
            return { cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] };
          }
        }),

      // Remove item from cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Update item quantity
      updateQuantity: (id, size, quantity) =>
        set((state) => ({
          cart: quantity > 0
            ? state.cart.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
              )
            : state.cart.filter((item) => item.id !== id || item.size !== size), // Remove if quantity is 0
        })),

      // Clear the entire cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Storage key
      getStorage: () => localStorage, // Use local storage
    }
  )
);

export default useCartStore;
