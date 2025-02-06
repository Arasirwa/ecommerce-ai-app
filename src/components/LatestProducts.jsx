import React from 'react'

const LatestProducts = (props) => {
  return (
    <section className="py-10 bg-background-200">
    <div className="container mx-auto px-4">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-primary-500 mb-8">
        Latest Arrivals
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {props.latestProducts &&
          props.latestProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              {/* Product Image */}
              <div className="w-full h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-text-900 truncate">
                  {product.name}
                </h3>

                <p className="text-sm text-text-600 mt-1">
                  {product.gender}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-primary-500 mt-2">
                  ⭐⭐⭐⭐⭐{" "}
                  <span className="text-text-600 text-sm">
                    ({product.reviews?.[0]?.rating ?? "N/A"})
                  </span>
                </div>

                {/* Price */}
                <span className="text-lg text-primary-600 font-bold block mt-2">
                  Ksh: {product.prevPrice}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
  )
}

export default LatestProducts
