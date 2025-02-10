import { useEffect } from "react";
import Banner from "../components/Banner";
import PoliciesAndSubscriptions from "../components/PoliciesAndSubscriptions";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import useProductStore from "../stores/useProductStore";

export default function Home() {
  const { products, fetchProducts } = useProductStore();


  useEffect(() => {
    fetchProducts();
  }, []);

  const bestSellingProducts = products.filter(
    (product) => product.isBestselling
  );
  const latestProducts = products.filter((product) => product.isLatest);

  return (
    <>
      <Banner />
      <section className="py-10 bg-background-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-500 mb-8">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {latestProducts &&
              latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-background-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary-500 mb-8">
            Best Sellers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellingProducts &&
              bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      <PoliciesAndSubscriptions />
    </>
  );
}
