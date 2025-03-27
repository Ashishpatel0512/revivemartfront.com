import React, { useState, useEffect } from "react";
import { Cards } from "../../component/Dashboard/Cards";
import { fetchwishlist } from "../../services/services";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
const showproduct = [
  {
    name: "Tata Nexon EV",
    price: "₹16,49,000",
    category: "Electric SUV",
    other: "Long-range, 40.5 kWh Battery, 5-seater",
    location: "Mumbai, Maharashtra, India",
    description: `The Tata Nexon EV is a state-of-the-art electric SUV designed for urban and highway driving. 
    With a powerful 40.5 kWh battery, it offers an impressive range of 453 km on a full charge, making it ideal for long drives. 
    The car features a bold design, aerodynamic structure, and advanced LED headlamps for enhanced visibility.
  
    **Key Features:**
    - **Battery & Range:** 40.5 kWh Lithium-ion battery with fast charging (10% - 80% in 56 minutes).
    - **Performance:** 143 PS peak power with 215 Nm torque, ensuring a thrilling drive.
    - **Interiors & Comfort:** Spacious 5-seater with premium leather upholstery, a 10.25-inch touchscreen infotainment system, and voice assistant support.
    - **Safety:** Equipped with 6 airbags, ABS with EBD, electronic stability control, and hill-hold assist.
    - **Connectivity:** Supports Android Auto, Apple CarPlay, and Tata’s iRA Connected Car technology.
    - **Ownership Benefits:** 8-year / 1.6 lakh km battery warranty, and nationwide service network.
    
    The Tata Nexon EV is an ideal choice for eco-conscious buyers looking for a sustainable and feature-packed vehicle.`,
    image: [
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    ],
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    owner: {
      _id: "65f2b9d0e3a0a45b12345678", // Reference to the user in the database
      image:
        "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210",
    },
  },
  {
    name: "Tata Nexon EV",
    price: "₹16,49,000",
    category: "Electric SUV",
    other: "Long-range, 40.5 kWh Battery, 5-seater",
    location: "Mumbai, Maharashtra, India",
    description: `The Tata Nexon EV is a state-of-the-art electric SUV designed for urban and highway driving. 
    With a powerful 40.5 kWh battery, it offers an impressive range of 453 km on a full charge, making it ideal for long drives. 
    The car features a bold design, aerodynamic structure, and advanced LED headlamps for enhanced visibility.
  
    **Key Features:**
    - **Battery & Range:** 40.5 kWh Lithium-ion battery with fast charging (10% - 80% in 56 minutes).
    - **Performance:** 143 PS peak power with 215 Nm torque, ensuring a thrilling drive.
    - **Interiors & Comfort:** Spacious 5-seater with premium leather upholstery, a 10.25-inch touchscreen infotainment system, and voice assistant support.
    - **Safety:** Equipped with 6 airbags, ABS with EBD, electronic stability control, and hill-hold assist.
    - **Connectivity:** Supports Android Auto, Apple CarPlay, and Tata’s iRA Connected Car technology.
    - **Ownership Benefits:** 8-year / 1.6 lakh km battery warranty, and nationwide service network.
    
    The Tata Nexon EV is an ideal choice for eco-conscious buyers looking for a sustainable and feature-packed vehicle.`,
    image: [
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    ],
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    owner: {
      _id: "65f2b9d0e3a0a45b12345678", // Reference to the user in the database
      image:
        "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210",
    },
  },
  {
    name: "Tata Nexon EV",
    price: "₹16,49,000",
    category: "Electric SUV",
    other: "Long-range, 40.5 kWh Battery, 5-seater",
    location: "Mumbai, Maharashtra, India",
    description: `The Tata Nexon EV is a state-of-the-art electric SUV designed for urban and highway driving. 
    With a powerful 40.5 kWh battery, it offers an impressive range of 453 km on a full charge, making it ideal for long drives. 
    The car features a bold design, aerodynamic structure, and advanced LED headlamps for enhanced visibility.
  
    **Key Features:**
    - **Battery & Range:** 40.5 kWh Lithium-ion battery with fast charging (10% - 80% in 56 minutes).
    - **Performance:** 143 PS peak power with 215 Nm torque, ensuring a thrilling drive.
    - **Interiors & Comfort:** Spacious 5-seater with premium leather upholstery, a 10.25-inch touchscreen infotainment system, and voice assistant support.
    - **Safety:** Equipped with 6 airbags, ABS with EBD, electronic stability control, and hill-hold assist.
    - **Connectivity:** Supports Android Auto, Apple CarPlay, and Tata’s iRA Connected Car technology.
    - **Ownership Benefits:** 8-year / 1.6 lakh km battery warranty, and nationwide service network.
    
    The Tata Nexon EV is an ideal choice for eco-conscious buyers looking for a sustainable and feature-packed vehicle.`,
    image: [
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg",
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
    ],
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    owner: {
      _id: "65f2b9d0e3a0a45b12345678", // Reference to the user in the database
      image:
        "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.com",
      phone: "+91 98765 43210",
    },
  },
];
export const Wishlist = () => {
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    fetchwishlist().then((data) => {
      console.log("data...", data.wishlist);
      setwishlist(data.wishlist);
    });
  }, []);

  return (
    <div>
      <Link to={"/"}>
        <IoMdArrowRoundBack className="ml-10 mt-5 text-2xl" />
      </Link>
      <h1 className="text-center text-3xl font-semibold text-sky-800 font-mono">
        WISHLIST
      </h1>
      <Cards showproduct={wishlist} />
    </div>
  );
};
