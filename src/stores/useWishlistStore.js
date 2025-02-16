import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishListStore = create(
  persist(
    (set, get) => ({
      wishList: [],

      // Add item to wishlist (with duplicate check)
      addToWishList: (item, showMessage) => {
        const { wishList } = get();
        const exists = wishList.some((i) => i.id === item.id && i.size === item.size);

        if (exists) {
          if (showMessage) showMessage("Item already exists in your wishlist!");
          return; // Prevent duplicate addition
        }

        set({ wishList: [...wishList, { ...item, quantity: item.quantity || 1 }] });
      },

      // Remove item from wishlist
      removeFromWishList: (id) =>
        set((state) => ({
          wishList: state.wishList.filter((item) => item.id !== id),
        })),

      // Clear wishlist
      clearWishList: () => set({ wishList: [] }),
    }),
    {
      name: "wishList-storage", // Storage key
      getStorage: () => localStorage, // Use local storage for persistence
    }
  )
);

export default useWishListStore;
