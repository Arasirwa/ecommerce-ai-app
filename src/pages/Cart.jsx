import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <FaShoppingCart className="text-gray-400 text-6xl mb-4" />
        <p className="text-lg text-gray-600">Your cart is empty</p>
        <Link
          to="/collections"
          className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 mt-12 pb-24">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-8">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex flex-col md:flex-row items-center gap-6 p-6 border rounded-lg shadow-md bg-white"
          >
            {/* Image */}
            <Link to={`/product/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />
            </Link>

            {/* Product Details */}
            <div className="flex-1">
              <Link to={`/product/${item.id}`}>
                <h2 className="text-xl font-semibold">{item.name}</h2>
              </Link>
              <p className="text-gray-500">Size: {item.size}</p>
              <p className="text-lg font-semibold text-primary">
                Ksh {item.price * item.quantity}
              </p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.size,
                    Math.max(1, item.quantity - 1)
                  )
                }
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400 transition"
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.id, item.size, item.quantity + 1)
                }
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <FaTrash size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-12 border-t pt-6 pb-16">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>
            Ksh{" "}
            {cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </span>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-dark transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
