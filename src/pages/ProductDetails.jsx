import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";


export default function ProductDetails() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  const foundProduct = products.find((item) => Number(item.id) === Number(id));

  useEffect(() => {
    if (foundProduct && !selectedImage) {
      setSelectedImage(foundProduct.images[0]);
    }
  }, [foundProduct]);

  if (!foundProduct)
    return (
      <p className="text-center py-10 text-gray-600">Loading product...</p>
    );

  const cartItem = {
    id: foundProduct.id,
    name: foundProduct.name,
    image: selectedImage, // The currently displayed image
    price: foundProduct.prevPrice,
    size: selectedSize,
    quantity: 1, // Default to 1
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(cartItem);
  };

  const handleAddToWishlist = () => {
    console.log("ADDED TO FAV");
    
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-12 space-y-16">
      {/* Product Display Section */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left - Images */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-96 border overflow-hidden rounded-lg shadow-md">
            <img
              src={selectedImage}
              alt={foundProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 mt-6 justify-center">
            {foundProduct.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover border rounded-lg cursor-pointer transition ${
                  selectedImage === img
                    ? "border-primary-500 scale-105"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <form onSubmit={handleAddToCart} className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{foundProduct.name}</h1>
          <p className="text-lg font-semibold">
            Price: Ksh {foundProduct.prevPrice}
          </p>

          {/* Shoe Size Selection */}
          <label className="block mt-4 font-medium">Select Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Choose Size</option>
            {foundProduct.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleAddToWishlist}
              className="border border-primary-500 text-primary-500 px-4 py-2 rounded hover:bg-primary-500 hover:text-white transition"
            >
              Add to Wishlist
            </button>
          </div>
        </form>
      </div>

      {/* Tabs Section (Details & Reviews) */}
      <div className="mt-16">
        <div className="border-b flex gap-10 pb-4 text-xl font-medium">
          <button
            className={`pb-2 transition ${
              activeTab === "details"
                ? "border-b-4 border-primary-500 text-primary-500"
                : "text-gray-600 hover:text-primary-500"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`pb-2 transition ${
              activeTab === "reviews"
                ? "border-b-4 border-primary-500 text-primary-500"
                : "text-gray-600 hover:text-primary-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({foundProduct.reviews?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8 text-lg text-gray-700">
          {activeTab === "details" && <p>{foundProduct.description}</p>}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {foundProduct.reviews && foundProduct.reviews.length > 0 ? (
                foundProduct.reviews.map((review, index) => (
                  <div key={index} className="border p-6 rounded-lg shadow-md">
                    <p className="text-xl font-medium">{review.username}</p>
                    <p className="text-yellow-500">
                      ⭐⭐⭐⭐⭐ {review.rating}/5
                    </p>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Space for Footer */}
      <div className="h-32"></div>
    </div>
  );
}
