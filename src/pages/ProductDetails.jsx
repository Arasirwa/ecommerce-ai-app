import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductStore from "../stores/useProductStore";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, fetchProducts } = useProductStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("details"); // Tab switching state

  console.log("Params object:", { id });
  console.log("All Products:", products);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  const foundProduct = products.find((item) => Number(item.id) === Number(id));
  console.log("Found Product:", foundProduct);

  if (!foundProduct) return <p className="text-center py-10">Loading product...</p>;

  if (!selectedImage) setSelectedImage(foundProduct.images[0]);

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
                  selectedImage === img ? "border-primary-500 scale-105" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-text-900">{foundProduct.name}</h1>
          <p className="text-text-600 text-lg">{foundProduct.brand}</p>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-lg">
            ⭐⭐⭐⭐⭐{" "}
            <span className="text-text-600">
              ({foundProduct.reviews?.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary-600">
              Ksh: {foundProduct.prevPrice}
            </span>
            {foundProduct.newPrice && (
              <span className="text-xl text-gray-500 line-through">
                Ksh: {foundProduct.newPrice}
              </span>
            )}
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-text-700 font-medium text-lg">Select Size:</label>
            <div className="flex gap-3 mt-3">
              {foundProduct.sizes.map((size) => (
                <button
                  key={size}
                  className="px-5 py-3 border rounded-lg text-lg hover:bg-primary-500 hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex gap-6 mt-6">
            <button className="bg-primary-600 text-white px-6 py-4 rounded-lg text-lg shadow-md hover:bg-primary-700 transition">
              Add to Cart
            </button>
            <button className="border border-primary-600 text-primary-600 px-6 py-4 rounded-lg text-lg shadow-md hover:bg-primary-100 transition">
              Add to Wishlist
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-6 text-text-700 space-y-2 text-lg">
            <p>🚚 Free delivery for orders above Ksh. 5000</p>
            <p>📦 Easy returns within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs Section (Details & Reviews) */}
      <div className="mt-16">
        <div className="border-b flex gap-10 pb-4 text-xl font-medium">
          <button
            className={`pb-2 transition ${
              activeTab === "details"
                ? "border-b-4 border-primary-600 text-primary-600"
                : "text-gray-600 hover:text-primary-600"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`pb-2 transition ${
              activeTab === "reviews"
                ? "border-b-4 border-primary-600 text-primary-600"
                : "text-gray-600 hover:text-primary-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({foundProduct.reviews?.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8 text-lg text-text-700">
          {activeTab === "details" && <p>{foundProduct.description}</p>}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {foundProduct.reviews && foundProduct.reviews.length > 0 ? (
                foundProduct.reviews.map((review, index) => (
                  <div key={index} className="border p-6 rounded-lg shadow-md">
                    <p className="text-xl font-medium">{review.username}</p>
                    <p className="text-yellow-500">⭐⭐⭐⭐⭐ {review.rating}/5</p>
                    <p className="text-text-700 mt-2">{review.comment}</p>
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
