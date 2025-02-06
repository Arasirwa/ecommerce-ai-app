import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import PoliciesAndSubscriptions from "../components/PoliciesAndSubscriptions";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component

export default function Home() {
  const [latestProducts, setIsLatestProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const latestProducts = data.filter(
          (latestProduct) => latestProduct.isLatest === true
        );
        setIsLatestProducts(latestProducts);
        const bestSellers = data.filter(
          (bestSeller) => bestSeller.isBestselling === true
        );
        setBestSellingProducts(bestSellers);
      })
      .catch((error) => {
        console.log("Error fetching the products", error);
      });
  }, []);

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
