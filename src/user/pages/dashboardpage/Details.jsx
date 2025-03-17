import React from 'react'
import { Navbar } from '../../component/dashboard/Navbar'
import { BsChatRightText } from "react-icons/bs";
import { SlUserFollow } from "react-icons/sl";
  import { IoIosHeartEmpty } from "react-icons/io";


import { useState } from 'react'
const product = {
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
  imageSrc: ['https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg', 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg','https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg'],
  imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  owner: {
    _id: "65f2b9d0e3a0a45b12345678",  // Reference to the user in the database
    image:"https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/varun-dhawan-1655307065.jpg",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+91 98765 43210",
  }
};


function Details() {
  const [products, setProducts] = useState(product);
  const [img, setImg] = useState(products?.imageSrc[0]);
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
      {/* //side1 */}
       <div className=" text-white m-5 text-center">
           <div className='flex justify-center items-center gap-10 sticky top-0'>
           <div>
              <img src={products?.imageSrc[0]} alt=""  className='h-20 w-20 mb-5 mt-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black ' onClick={()=>{setImg(products.imageSrc[0])}}/>
              <img src={products?.imageSrc[1]} alt="" className='h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black' onClick={()=>{setImg(products.imageSrc[1])}}/>
              <img src={products?.imageSrc[2]} alt="" className='h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black' onClick={()=>{setImg(products.imageSrc[2])}}/>
              <img src={products?.imageSrc[3]} alt="" className='h-20 w-20 mb-5 border-gray-300 border-2 p-2 rounded-[5px] hover:border-black' onClick={()=>{setImg(products.imageSrc[3])}}/>
          </div>
           <div>
            {/* like button */}
           <IoIosHeartEmpty  className="relative top-22 left-[90%]  text-3xl text-gray-800 bg-white rounded-full p-1" />
           <img src={img} alt="" className='h-[50vh] w-[30vw] border-gray-500 border-2 p-2 shadow-lg shadow-black rounded-[10px] mt-10'/>
            <button className='text-white font-semibold bg-sky-700 w-[100%] h-10 shadow-md  shadow-gray-600  rounded-[10px] mt-5'>Add Bids</button>
          </div>
           
         </div>
          
         <div className='shadow-gray-400  bg-gradient-to-r from-sky-100 via-gray-100 to-white shadow-md  rounded-[5px] h-auto w-[30vw] mt-5 pb-5 flex justify-between items-center gap-5 ml-auto mr-18 '> 
          <div className='text-center'>            
            <img src={products?.owner.image} alt=""className='h-14 w-14 rounded-full ml-7 mt-2' />
            {/* <button className='flex justify-left items-center gap-2 shadow-md shadow-gray-200 hover:bg-sky-600  text-xl font-semibold bg-sky-400 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-3 ml-2'><BsChatRightText  /><p>Chat</p></button> */}

          </div>
          <div className='text-right mr-2'>
            <h1 className='text-3xl font-semibold text-gray-500'>{products?.owner.name}</h1>
            <p className='text-xl text-gray-500'>{products?.owner.email}</p>
            <p className='text-xl text-gray-500'>{products?.owner.phone}</p>
          </div>
           
         </div>
         <div className=' h-auto w-[30vw] mt-5 pb-5 flex justify-between items-center gap-5 ml-auto mr-18 '>
         <button className='flex justify-lef items-center gap-2 shadow-lg shadow-gray-300 hover:bg-sky-600  text-xl font-semibold bg-sky-400 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-3 '><BsChatRightText  /><p>Chat</p></button>
         <button className='flex justify-left items-center gap-2 shadow-lg shadow-gray-300 hover:bg-sky-600  text-xl font-semibold bg-blue-700 text-white rounded-[5px] p-1/2 pl-4 pr-4 mt-2 ml-1'><SlUserFollow /><p>follow</p></button>

         </div>
       </div>
      {/* side2 */}
      <div className='bg-white text-black m-5 mr-10'>
         <div className='border-gray-400 border-2 p-2 rounded-[5px] h-auto w-auto mt-5 bg-gray-50'>
          <div className=' shadow-gray-400 shadow-sm p-2 rounded-[5px] bg-white'>
            <h1 className='text-3xl font-semibold'>{products?.name}</h1>
            <p className='text-2xl text-gray-500'>{products?.price}</p>
          </div>
          <div className='shadow-gray-400 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5' >
            <p className='text-xl font-semibold'>{products?.category}</p>
            <p className='text-xl text-gray-500'>{products?.other}</p>
          </div>
          <div className='shadow-gray-400 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5'>
            <p className='text-xl font-semibold'>Location</p>
            <p className='text-xl text-gray-500'>{products?.location}</p>
          </div>
          <div className='shadow-gray-400 shadow-sm p-2 rounded-[5px] h-auto w-auto mt-5' >
            <p className='text-xl font-semibold'>Description</p>
            <p className='text-xl text-gray-500'>{products?.description}</p>
          </div>
          
          <div></div>
         </div>
      </div>
      </div>
    </>
  )
}

export default Details