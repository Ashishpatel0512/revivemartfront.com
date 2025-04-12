import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AdsCarousel = ({ adsList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsList.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [adsList.length]);

  return (
    <div className="relative w-full  py-6 px-4 overflow-hidden">
      {/* Carousel */}
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {adsList.map((ads, index) => (
          <Link
            key={ads.Productid._id}
            to={`/details/${ads.Productid._id}`}
            className="flex-shrink-0 w-full"
          >
            <div className="relative bg-sky-100 ml-5 mr-5 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 hover:shadow-xl transition duration-300 ease-in-out">
              {/* Left Side */}
              <div className="md:w-1/2 w-full space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 truncate">{ads.Productid.name}</h3>
                <p className="text-lg text-gray-700 font-medium">Price: {ads.Productid.price}&#x20b9;</p>
              </div>

              {/* Right Side */}
              <div className="md:w-1/2 w-full flex justify-center items-center">
                <img
                  src={ads.Productid.image[0]?.url}
                  alt={ads.Productid.name}
                  className="h-60 w-auto object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {adsList.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'} transition-all`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AdsCarousel;
