import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoChevronBackCircle } from "react-icons/io5";
import { useEffect } from "react";
import { useState } from "react";
import { fetchproductbids } from "../../services/services";
// const product = {
//     name: "Tata Nexon EV",
//     price: "₹16,49,000",
//     category: "Electric SUV",
//     other: "Long-range, 40.5 kWh Battery, 5-seater",
//     location: "Mumbai, Maharashtra, India",
//     description: `The Tata Nexon EV is a state-of-the-art electric SUV designed for urban and highway driving.
//     With a powerful 40.5 kWh battery, it offers an impressive range of 453 km on a full charge, making it ideal for long drives.
//     The car features a bold design, aerodynamic structure, and advanced LED headlamps for enhanced visibility.

//     **Key Features:**
//     - **Battery & Range:** 40.5 kWh Lithium-ion battery with fast charging (10% - 80% in 56 minutes).
//     - **Performance:** 143 PS peak power with 215 Nm torque, ensuring a thrilling drive.
//     - **Interiors & Comfort:** Spacious 5-seater with premium leather upholstery, a 10.25-inch touchscreen infotainment system, and voice assistant support.
//     - **Safety:** Equipped with 6 airbags, ABS with EBD, electronic stability control, and hill-hold assist.
//     - **Connectivity:** Supports Android Auto, Apple CarPlay, and Tata’s iRA Connected Car technology.
//     - **Ownership Benefits:** 8-year / 1.6 lakh km battery warranty, and nationwide service network.

//     The Tata Nexon EV is an ideal choice for eco-conscious buyers looking for a sustainable and feature-packed vehicle.`,
//     imageSrc: ['https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg'],
//     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//     owner: {
//       _id: "65f2b9d0e3a0a45b12345678",  // Reference to the user in the database
//       image:"https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
//       name: "Rajesh Sharma",
//       email: "rajesh.sharma@example.com",
//       phone: "+91 98765 43210",
//     }
//   };
export const Showbids = ({ productid, product }) => {
  //  const [products, setProducts] = useState(product);
  const [bids, setbids] = useState([]);

  const [img, setImg] = useState(product?.image[0].url);
  const [readmsg, setreadmsg] = useState("");

  //fetch bids
  useEffect(() => {
    fetchproductbids(productid).then((data) => {
      console.log("data...", data.bids);
      setbids(data.bids);
    });
  }, []);

  return (
    <div className="fixed top-[20%] left-[30vw] h-[60%] w-[50vw] bg-white shadow-xl  shadow-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
      {/* side1 */}
      <div className="flex justify-center gap-10 sticky top-0">
        <div className="mt-10 ml-10">
          <img
            src={product?.image[0].url}
            alt=""
            className="h-10 w-10 mb-5  border-gray-300 border-2 rounded-[5px] hover:border-black "
            onClick={() => {
              setImg(product.image[0].url);
            }}
          />
          <img
            src={product?.image[1].url}
            alt=""
            className="h-10 w-10 mb-5 border-gray-300 border-2 rounded-[5px] hover:border-black"
            onClick={() => {
              setImg(product.image[1].url);
            }}
          />
          <img
            src={product?.image[2].url}
            alt=""
            className="h-10 w-10 mb-5 border-gray-300 border-2  rounded-[5px] hover:border-black"
            onClick={() => {
              setImg(product.image[2].url);
            }}
          />
          <img
            src={product?.image[3].url}
            alt=""
            className="h-10 w-10 mb-5 border-gray-300 border-2  rounded-[5px] hover:border-black"
            onClick={() => {
              setImg(product.image[3].url);
            }}
          />
        </div>
        <div className="mt-20">
          <img
            src={img}
            alt=""
            className="h-[20vh] w-[15vw] border-gray-500 border-2 p-2 shadow-lg shadow-black rounded-[10px] "
          />
        </div>
      </div>
      {/* side2 */}
      <div className="h-[100%] w-full bg-gray-300 text-center overflow-y-auto">
        {/* bids */}
        {bids?.map((bids) => (
          <div className="flex gap-1 h-[20%] w-[90%] bg-white shadow-md shadow-black ml-5 mt-3 relative rounded-[10px]">
            <img
              src={bids?.User?.image?.url}
              alt=""
              className="h-[100%] w-[25%]"
            />
            <div>
              <p className="m-2">{bids?.User?.name}</p>
              <p className="m-2">{bids.contact}</p>
            </div>
            <div className="h-[100%] w-[30%] bg-gray-200">
              <p className="text-auto font-bold mt-2">{bids.bidamount}</p>
              <button
                className="text-sm   mt-5 text-gray-400 p-1 rounded-[5px]"
                onClick={() => {
                  setreadmsg(bids._id);
                }}
              >
                read message
              </button>
            </div>
            {/* readmsg component */}
            {readmsg === bids._id ? (
              <div className="absolute top-0 left-0 bg-gray-400 text-white  h-[100%] w-[100%] overflow-y-auto">
                <IoChevronBackCircle
                  className=" text-xl sticky  top-2 left-2 "
                  onClick={() => {
                    setreadmsg("");
                  }}
                />
                <p className="font-mono">{bids.message}</p>
              </div>
            ) : (
              ""
            )}
            {/*  */}
          </div>
        ))}
        {/* ahisudhi */}
      </div>
    </div>
  );
};
