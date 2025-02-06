import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import LatestProducts from "../components/LatestProducts";
import Header from "../components/Header";

import BestSellers from "../components/BestSellers";
import PoliciesAndSubscriptions from "../components/PoliciesAndSubscriptions";

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
      <LatestProducts latestProducts={latestProducts} />
      <BestSellers bestSellers={bestSellingProducts} />
      <PoliciesAndSubscriptions />
    </>
  );
}
