import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Order Placed Successfully!");
    clearCart();
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Delivery Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <form className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="address" placeholder="Street Address" onChange={handleChange} required className="w-full p-2 border rounded" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-full p-2 border rounded" />
            <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <input type="text" name="country" placeholder="Country" onChange={handleChange} required className="w-full p-2 border rounded" />
          <textarea name="notes" placeholder="Delivery Notes (Optional)" onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        </form>
      </div>

      {/* Right Side - Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">Size: {item.size}</p>
                </div>
              </div>
              <p className="font-semibold">Ksh {item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>Ksh {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>{deliveryFee === 0 ? "Free" : `Ksh ${deliveryFee}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>Ksh {total}</span>
          </div>
        </div>
        {/* Checkout Button */}
        <button onClick={handleCheckout} className="mt-4 w-full bg-primary-500 text-white py-2 rounded hover:bg-gray-500 transition">
          Place Order
        </button>
        <Link to="/collections" className="block mt-2 text-center text-primary-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
