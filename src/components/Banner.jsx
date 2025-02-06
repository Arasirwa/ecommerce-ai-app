import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "src/assets/Ultraboost_22_Shoes_Grey_GX5460_01_standard.webp",
    "src/assets/mfcprcb5_nb_02_i.webp",
    "src/assets/VN000D3H_Y28_ALT1.webp",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-6">
      <h1 className="text-3xl md:text-5xl font-bold">
          <Typewriter
            words={['Step into Style.', 'Discover the Best Footwear.', 'Elevate Your Look.']}
            loop={0} // 0 = infinite
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="text-lg md:text-xl text-white opacity-0 animate-fadeIn">
          Step up your game with our latest collection.
        </p>
      </div>
    </section>
  );
};

export default Banner;
