import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Sidebar = ({ show, setshow }) => {
  const location = useLocation();
  return (
    <div className="h-screen w-[15vw] bg-gray-300 text-center rounded-tr-[20px] ">
       <Link to={'/'}>
      <h1 className="text-gray-800 font-semibold text-xl pt-7 font-sans mb-5">
        Revivemart
        </h1>
        </Link>
      <hr className="border-gray-400" />
      <div className="mt-20">
        <Link to={"/"}>
        <div className="flex items-center justify-around text-lg mt-5 p-1 hover:bg-gray-500">
          <div className=" flex items-center justify-left  gap-2  w-[70%] font-mono text-lg rounded-[5px] text-gray-800">
          <CiHome />
          <p>Home</p>
            </div>
            <MdKeyboardArrowRight />
            </div>
        </Link>
        {location.pathname == "/profile" ?
          <div>
        <div className="flex items-center justify-around text-lg mt-5 p-1 hover:bg-gray-500">
        <div
          className="flex items-center justify-left  gap-2  w-[70%]  font-mono text-lg rounded-[5px] text-gray-800"
          onClick={() => {
            setshow("myproduct");
          }}
            >
              <CiBoxList />
              <p>Myproduct</p>
              </div>
              <MdKeyboardArrowRight />
            </div>
        <div className="flex items-center justify-around text-lg mt-5 p-1 hover:bg-gray-500">
        <div
          className="flex items-center justify-left  gap-2 w-[70%]  font-mono text-lg rounded-[5px]  text-gray-800"
          onClick={() => {
            setshow("mybids");
          }}
            >
              <MdOutlineLocalOffer />
               <p>Mybids</p>
              </div>
              <MdKeyboardArrowRight />
            </div>
              
        <div className="flex items-center justify-around text-lg mt-5 p-1 hover:bg-gray-500">
        <div className="flex items-center justify-left  gap-2  w-[70%]  font-mono text-lg rounded-[5px]  text-gray-800"  onClick={() => {
            setshow("myads");
            }}>
          <RiAdvertisementLine />
           <p>Promoted Item</p>
            </div>
            <MdKeyboardArrowRight />
            </div>
            </div>
        :""}
      </div>
    </div>
  );
};
