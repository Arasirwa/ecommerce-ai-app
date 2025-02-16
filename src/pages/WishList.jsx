import { Link } from "react-router-dom";
import useWishListStore from "../stores/useWishlistStore";
import { FaHeartBroken, FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const { wishList, removeFromWishList, clearWishList } = useWishListStore();

  // Empty state UI
  if (wishList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <FaHeartBroken className="text-gray-400 text-6xl mb-4" />
        <p className="text-lg text-gray-600">Your wishlist is empty</p>
        <Link
          to="/collections"
          className="mt-4 bg-primary-500 text-white px-6 py-2 rounded shadow-md transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-1 pb-24">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishList.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex flex-col p-4 border rounded-lg shadow-md"
          >
            {/* Image */}
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </Link>

            {/* Product Details */}
            <div className="mt-4 flex-1">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="text-lg font-semibold text-primary-600">
                Ksh {item.price}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromWishList(item.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <FaTrash size={16} /> Remove
            </button>
          </div>
        ))}
      </div>

      {/* Clear Wishlist */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={clearWishList}
          className="bg-primary-500 text-white px-6 py-2 rounded shadow-md hover:bg-gray-700 transition"
        >
          Clear Wishlist
        </button>
      </div>
    </div>
  );
}
