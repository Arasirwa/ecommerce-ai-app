import { NavLink } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";
import { LuCircleUser } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";

const Header = (props) => {
  const { setSearchQuery } = useProductStore();
  const { cart } = useCartStore();
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 md:px-8 py-4">
        <NavLink to="/">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-900">
            Shoe <span className="text-primary-500">Store</span>
          </h1>
        </NavLink>
        <ul className="hidden lg:flex space-x-8 text-lg font-medium">
          <li>
            <NavLink to="/" className="hover:text-primary-500 transition">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collections"
              className="hover:text-primary-500 transition"
            >
              Collections
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          <div className="relative flex items-center bg-background-200 border border-gray-300 rounded-md px-3 sm:px-4 py-2 w-32 sm:w-48">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-text-900 w-full"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="text-xl text-text-500" />
          </div>
          <NavLink to="/profile" className="relative">
            <LuCircleUser className="text-2xl sm:text-3xl text-text-900 hover:text-primary-500 transition" />
            <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              1
            </span>
          </NavLink>
          <NavLink to="/wishlist" className="relative">
            <FaRegHeart className="text-2xl sm:text-3xl text-text-900 hover:text-primary-500 transition" />
            <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </NavLink>
          <NavLink to="/cart" className="relative">
            <BiShoppingBag className="text-2xl sm:text-3xl text-text-900 hover:text-primary-500 transition" />

            <span className="absolute -top-2 -right-2 bg-secondary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </NavLink>
          <button
            className="lg:hidden text-2xl text-text-900"
            onClick={() => props.setIsMenuOpen(!props.isMenuOpen)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>
      {props.isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-md p-4">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <NavLink
                to="/"
                className="hover:text-primary-500 transition"
                onClick={() => props.setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/collections"
                className="hover:text-primary-500 transition"
                onClick={() => props.setIsMenuOpen(false)}
              >
                Collections
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
