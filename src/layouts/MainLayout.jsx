import { Outlet} from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
  <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
