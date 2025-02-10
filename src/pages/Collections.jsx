import { useEffect } from "react";
import useProductStore from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

export default function Collections() {
  const {
    filteredProducts,
    fetchProducts,
    setFilters,
    setSortBy,
    filters,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (filterType, value) => {
    const updatedFilter = filters[filterType].includes(value)
      ? filters[filterType].filter((item) => item !== value)
      : [...filters[filterType], value];

    setFilters({ [filterType]: updatedFilter });
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    setFilters({ maxPrice: Number(e.target.value) });
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <aside className="md:col-span-1 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-primary-500">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="flex flex-col gap-2">
              {["Sneakers", "Sports", "Boots", "Official", "Slippers", "Children"].map(
                (category) => (
                  <label key={category} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCheckboxChange("categories", category)}
                    />
                    {category}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Brand</h3>
            <div className="flex flex-col gap-2">
              {["Nike", "Puma", "Converse", "Vans", "Adidas", "New Balance", "BIRKENSTOCK", "Chippewa", "Gucci", "NORDSTORM", "FARFETCH"].map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange("brands", brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Gender</h3>
            <div className="flex flex-col gap-2">
              {["unisex", "men", "women"].map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.genders.includes(gender)}
                    onChange={() => handleCheckboxChange("genders", gender)}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Range</h3>
            <label className="flex items-center justify-between text-sm">
              <span>Ksh:{filters.minPrice}</span>
              <input
                type="range"
                min="0"
                max="1500"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-full mx-2"
              />
              <span>Ksh:{filters.maxPrice}</span>
            </label>
          </div>
        </aside>

        {/* Product Section */}
        <section className="md:col-span-3">
          {/* Sorting */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary-500">ALL COLLECTIONS</h2>
            <select
              name="sort"
              className="border rounded-lg p-2 text-sm"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option defaultValue>Sort</option>
              <option value="highestPrice">High to Low</option>
              <option value="lowestPrice">Low to High</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
