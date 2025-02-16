import { create } from "zustand";


// Load stored filters from localStorage
const storedFilters = JSON.parse(localStorage.getItem("filters")) || {
  categories: [],
  brands: [],
  genders: [],
  minPrice: 0,
  maxPrice: 1500,
};

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  searchQuery: localStorage.getItem("searchQuery") || "",
  filters: storedFilters, // Use stored filters
  sortBy: "",

  // Fetch products from API
  fetchProducts: async () => {
    try {
      const response = await fetch("http://localhost:8000/products");
      const data = await response.json();
      set({ products: data, filteredProducts: data });
      get().applyFilters(); // Apply filters after fetching products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Set search query
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    localStorage.setItem("searchQuery", query); // Store search query
    get().applyFilters();
  },

  // Update filters
  setFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.filters, ...newFilters };
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
      return { filters: updatedFilters };
    });
    get().applyFilters();
  },

  // Set sorting order
  setSortBy: (sortType) => {
    set({ sortBy: sortType });
    get().applyFilters();
  },

  // Apply filters & sorting
  applyFilters: () => {
    let { products, filters, searchQuery, sortBy } = get();
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by brands
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Filter by genders
    if (filters.genders.length > 0) {
      filtered = filtered.filter((product) =>
        filters.genders.includes(product.gender)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.prevPrice >= filters.minPrice &&
        product.prevPrice <= filters.maxPrice
    );

    // Sort by price
    if (sortBy === "highestPrice") {
      filtered.sort((a, b) => b.prevPrice - a.prevPrice);
    } else if (sortBy === "lowestPrice") {
      filtered.sort((a, b) => a.prevPrice - b.prevPrice);
    }

    set({ filteredProducts: filtered });
  },
}));

export default useProductStore;
