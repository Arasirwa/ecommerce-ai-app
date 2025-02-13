import { Outlet} from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
  <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="bg-background-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
