import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Link
      to={`/product/${props.product.id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
        <img
          src={props.product.images[0]}
          alt={props.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-900 truncate">
          {props.product.name}
        </h3>

        <p className="text-sm text-text-600 mt-1">{props.product.gender}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-primary-500 mt-2">
          ⭐⭐⭐⭐⭐{" "}
          <span className="text-text-600 text-sm">
            ({props.product.reviews?.[0]?.rating ?? "N/A"})
          </span>
        </div>

        {/* Price */}
        <span className="text-lg text-primary-600 font-bold block mt-2">
          Ksh: {props.product.prevPrice}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
