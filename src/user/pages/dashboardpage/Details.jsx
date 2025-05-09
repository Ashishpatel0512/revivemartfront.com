//map
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//

import React from "react";
// import { Navbar } from "../../component/dashboard/Navbar";
import { Navbar } from "../../component/Dashboard/Navbar";
import { BsChatRightText } from "react-icons/bs";
import { SlUserFollow } from "react-icons/sl";
import { IoIosHeartEmpty, IoMdArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { fetchproductinfo, newbid,wishlist } from "../../services/services";
import { followfunction } from "../../services/services";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/usercontext";
import { Link } from "react-router-dom";
import { CiSquareRemove } from "react-icons/ci";
import Loader from "../../component/Dashboard/Loader";
import { FaHeart } from "react-icons/fa";
// const product = {
//   name: "Tata Nexon EV",
//   price: "₹16,49,000",
//   category: "Electric SUV",
//   other: "Long-range, 40.5 kWh Battery, 5-seater",
//   location: "Mumbai, Maharashtra, India",
//   description: `The Tata Nexon EV is a state-of-the-art electric SUV designed for urban and highway driving.
//   With a powerful 40.5 kWh battery, it offers an impressive range of 453 km on a full charge, making it ideal for long drives.
//   The car features a bold design, aerodynamic structure, and advanced LED headlamps for enhanced visibility.

//   **Key Features:**
//   - **Battery & Range:** 40.5 kWh Lithium-ion battery with fast charging (10% - 80% in 56 minutes).
//   - **Performance:** 143 PS peak power with 215 Nm torque, ensuring a thrilling drive.
//   - **Interiors & Comfort:** Spacious 5-seater with premium leather upholstery, a 10.25-inch touchscreen infotainment system, and voice assistant support.
//   - **Safety:** Equipped with 6 airbags, ABS with EBD, electronic stability control, and hill-hold assist.
//   - **Connectivity:** Supports Android Auto, Apple CarPlay, and Tata’s iRA Connected Car technology.
//   - **Ownership Benefits:** 8-year / 1.6 lakh km battery warranty, and nationwide service network.

//   The Tata Nexon EV is an ideal choice for eco-conscious buyers looking for a sustainable and feature-packed vehicle.`,
//   imageSrc: ['https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg'],
//   imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//   owner: {
//     _id: "65f2b9d0e3a0a45b12345678",  // Reference to the user in the database
//     image:"https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
//     name: "Rajesh Sharma",
//     email: "rajesh.sharma@example.com",
//     phone: "+91 98765 43210",
//   }
// };

function Details() {
  const { user,login, setReceiver } = useAuth();
  const { productid } = useParams();
  console.log("product id in details page", productid);
  const [products, setProducts] = useState();
  const [location, setlocation] = useState();
  const [img, setImg] = useState();
  const [bidamount, setbidamount] = useState();
  const [message, setmessage] = useState();
  const [contact, setcontact] = useState();
  const [showbidform, setbidform] = useState(false);
  const [isfollow, setisfollow] = useState(false);
  const [Following, setfollow] = useState(false);
  const [loader, setloader] = useState(false);
  const bidform = `fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 ${
    showbidform ? "" : "hidden"
  }`;
  //fetch details
  useEffect(() => {
    fetchproductinfo(productid).then((data) => {
      console.log("data...", data.productinfo);
      setProducts(data.productinfo);
      setlocation([
        data.productinfo.location.latitude,
        data.productinfo.location.longitude,
      ]);
      setImg(data?.productinfo?.image[0]?.url)(
        data.productinfo.User[0].follwers?.includes(user._id)
          ? setisfollow(true)
          : setisfollow(false)
      );
    });
  }, [Following, setfollow]);
  //submit bid
  const handlesubmitbid = (e) => {
    setloader(true);
    e.preventDefault();
    const biddata = {
      bidamount,
      message,
      contact,
    };
    console.log(biddata);
    newbid(biddata, products._id).then((data) => {
      alert(data.SuccessMsg);
      setbidform(false);
      setloader(false);
    });
  };

  const follow = () => {
    setfollow(true);
    followfunction(products?.User[0]?._id).then((data) => {
      setfollow(false);
    });
  };
  return (
    <>
            <Navbar />
      
      {/* <Link to={"/"}>
        <IoMdArrowRoundBack className="ml-10 mt-5 text-2xl" />
      </Link> */}
      {loader ? <Loader /> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10">
          {/* //side1 */}
          <div className=" text-white m-5 text-center">
            <div className="lg:flex justify-center items-center gap-10 ">
              <div className="flex lg:flex-col lg:mt-0 mt-10">
                
              {products?.image?.map((img) => (
                     <img
                     src={img.url}
                     alt=""
                     className="h-20 w-20 mb-5 lg:mt-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black "
                     onClick={() => {
                       setImg(img?.url);
                     }}
                   />
                ))}


                {/* <img
                  src={products?.image[0]?.url}
                  alt=""
                  className="h-20 w-20 mb-5 lg:mt-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black "
                  onClick={() => {
                    setImg(products.image[0]?.url);
                  }}
                />
                <img
                  src={products?.image[1]?.url}
                  alt=""
                  className="h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black"
                  onClick={() => {
                    setImg(products.image[1]?.url);
                  }}
                />
                <img
                  src={products?.image[2]?.url}
                  alt=""
                  className="h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black"
                  onClick={() => {
                    setImg(products.image[2]?.url);
                  }}
                />
                <img
                  src={products?.image[3]?.url}
                  alt=""
                  className="h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black"
                  onClick={() => {
                    setImg(products.image[3].url);
                  }}
                /> */}
              </div>
              <div>
                {/* like button */}
                {/* <IoIosHeartEmpty className="relative top-22 left-[90%]  text-3xl text-gray-800 bg-white rounded-full p-1" /> */}
                   {user?.wishlist?.includes(products?._id) ? (
                                    <FaHeart
                                      className="relative relative top-22 left-[90%]  text-red-500 text-2xl"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        wishlist(products?._id).then((data) => {
                                          login(data?.User);
                                        });
                                      }}
                                    />
                                  ) : (
                                    <IoIosHeartEmpty
                                      className="relative relative top-22 left-[90%] text-gray-600 text-2xl"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        wishlist(products?._id).then((data) => {
                                          login(data?.User);
                                        });
                                      }}
                                    />
                                  )}



                {/*  */}
                <img
                  src={img}
                  alt=""
                  className="h-[50vh] w-[30vw] border-gray-500 border-2 p-2 shadow-lg shadow-black rounded-[10px] mt-10"
                />
                {user ? <button
                  className="text-white font-semibold bg-gray-700 w-[100%] h-10 shadow-sm  shadow-gray-600  rounded-[10px] mt-5"
                  onClick={() => {
                    setbidform(true);
                  }}
                >
                  Add Bids
                </button> : ""}
              </div>
            </div>

            <div className="shadow-gray-400  bg-white shadow-md border-2 border-gray-100  rounded-[5px] h-auto w-[30vw] mt-5 pb-5 flex justify-between items-center gap-5 ml-auto mr-18 ">
              <div className="text-center">
                <Link to={`/visite/${products?.User[0]?._id}`} >
                  <img
                    src={products?.User[0]?.image?.url}
                    alt=""
                    className="h-14 w-14 rounded-full ml-7 mt-2"
                  />
                </Link>
                {/* <button className='flex justify-left items-center gap-2 shadow-md shadow-gray-200 hover:bg-sky-600  text-xl font-semibold bg-sky-400 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-3 ml-2'><BsChatRightText  /><p>Chat</p></button> */}
              </div>
              <div className="text-right mr-2">
                <h1 className="text-3xl font-semibold text-gray-700  font-heading antialiased">
                  {products?.User[0]?.name}
                </h1>
                <p className="text-xl text-gray-500  font-heading antialiased">
                  {products?.User[0]?.emailid}
                </p>
                {/* <p className='text-xl text-gray-500'>{products?.owner.phone}</p> */}
              </div>
            </div>
            <div className=" h-auto w-[30vw] mt-5 pb-5 flex justify-between items-center gap-5 ml-auto mr-18 ">
              {user ?
                <Link
                  onClick={() => {
                    setReceiver(products?.User[0]);
                  }}
                  to={"/chat"}
                >
                  {" "}
                  <button className="flex justify-lef items-center gap-2 shadow-lg shadow-gray-300 hover:bg-sky-600  text-xl font-semibold bg-gray-700 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-3 ">
                    <BsChatRightText />
                    <p>Chat</p>
                  </button>
                </Link>
                : ""}
              {user ? <button
                className="flex justify-left items-center gap-2 shadow-lg shadow-gray-300 hover:bg-sky-600  text-xl font-semibold bg-gray-700 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-2 ml-1"
                onClick={follow}
              >
                <SlUserFollow />
                {isfollow ? <p>unfollow</p> : <p>follow</p>}
              </button> : ""}
            </div>
            {/* map */}
            {location ? (
              <div className="w-[30vw] h-[40vh] border-2 border-gray-300 ml-[12vw] rounded-[3px]">
                <MapContainer
                  center={location}
                  zoom={10}
                  className="h-[100%] w-[100%] z-0"
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                  <Marker position={location} />
                </MapContainer>
              </div>
            ) : (
              ""
            )}
            {/* map& */}
          </div>
          {/* side2 */}
          <div className="bg-white text-black m-5 mr-10 mt-18 font-sans">
            <div className="border-gray-100 border-2 p-2 rounded-[5px] h-auto w-auto mt-5 bg-white font-mono text-gray-900">
              <div className=" shadow-gray-300 shadow-sm p-2 rounded-[5px] ">
                <h1 className="text-3xl font-semibold">{products?.name}</h1>
                <p className="text-gray-600 text-xl font-bold">
                  {products?.price}&#x20b9;
                </p>
              </div>
              <div className="shadow-gray-300 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5">
                <p className="text-xl font-semibold">{products?.catagory}</p>
                <p className="text-md  text-gray-700  font-mono antialiased">{products?.other}</p>
              </div>
              <div className="shadow-gray-300 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5">
                <p className="text-xl font-semibold">Year</p>
                <p className="text-md text-gray-700  font-mono antialiased">{products?.age}/yearold</p>
              </div>
              {/* <div className="shadow-gray-300 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5">
                <p className="text-xl font-semibold ">Location</p>
                <p className="text-md text-gray-700 font-mono antialiased">
                  {products?.location.latitude}
                </p>
                <p className="text-md text-gray-700  font-mono antialiased">
                  {products?.location.longitude}
                </p>
              </div> */}
              <div className="shadow-gray-300 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5 font-mono antialiased ">
                <p className="text-xl font-semibold">Description</p>
                <p className="text-md text-gray-700">{products?.description}</p>
              </div>

              <div></div>
            </div>
            {/* bid form */}
            <div className={bidform}>
              <form
                action=""
                onSubmit={handlesubmitbid}
                className="relative top-[30%] left-[40%] bg-white w-[20%] h-[50%] rounded-[10px] text-center pt-10 shadow-xl shadow-gray-800"
              >
                <CiSquareRemove
                  className="text-3xl relative bottom-20 text-white"
                  onClick={() => {
                    setbidform(false);
                  }}
                />
                <h1 className="text-center font-semibold text-xl">bid</h1>
                <input
                  type="number"
                  placeholder="enter amount"
                  className="w-[80%] h-[5vh] border-black border-2 rounded-[10px] pl-5 text-xl"
                  required
                  onChange={(e) => {
                    setbidamount(e.target.value);
                  }}
                />
                {/* <label htmlFor="mobile">Enter Mobile Number:</label> */}
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="enter mobile number"
                  maxLength="10"
                  className="w-[80%] h-[5vh] border-black border-2 rounded-[10px] pl-5 text-xl mt-5"
                  required
                  onChange={(e) => {
                    setcontact(e.target.value);
                  }}
                />{" "}
                <br />
                <textarea
                  name=""
                  id=""
                  placeholder="enter message.."
                  className="w-[80%] h-[5vh] border-black border-2 rounded-[10px] pl-5 text-xl mt-5"
                  onChange={(e) => {
                    setmessage(e.target.value);
                  }}
                ></textarea>
                <input
                  type="submit"
                  value="SUBMIT"
                  className="bg-gray-700 text-xl p-1 rounded-[5px] mt-10 text-white"
                />
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Details;
