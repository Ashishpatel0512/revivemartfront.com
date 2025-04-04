import React from "react";
import { FaMobileScreen } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { TbFiltersFilled } from "react-icons/tb";

import { MdFormatColorText } from "react-icons/md";

import { useState } from "react";

export const Filters = ({ query, setquery }) => {
  const [showFilters, setShowFilters] = useState(false);

  const filterbtncss =
    "bg-sky-50 p-2  rounded-[10px]  hover:bg-sky-100 hover:text-sky-900 hover:shadow-md text-center";
  const filtercss = `bg-white lg:h-16  h-[11rem]  w-full fixed lg:top-[10vh]  top-[6vh] flex lg:justify-center justify-between  lg:gap-20 lg:pl-0 lg:mr-0 pl-5  items-center lg:pt-[10vh] lg:pb-[10vh]  pt-[3vh] mb-2 shadow-md lg:overflow-hidden	overflow-scroll ${
    showFilters ? "" : "hidden"
  }`;
  return (
    <>
      <div className="w-full flex justify-center items-center gap-5 fixed top-[10vh] z-10">
        <div
          onClick={() => {
            setShowFilters(!showFilters);
          }}
          className="z-20 "
        >
          <button className="animate-bounce text-center  flex items-center gap-1 p-1 text-sm rounded-[5px] bg-gray-100 text-sky-900 shadow-gray-300 shadow-md hover:bg-sky-100 hover:text-sky-900 hover:shadow-md text-center">
            {/* <IoFilter className='text-xl text-sky-900 text-white'/> */}
            <GoTriangleDown className=" text-xl" />
            <p>Filters</p>
          </button>
        </div>
      </div>

      <div className={filtercss}>
        <div className="flex justify-around items-center gap-20 mt-5 mb-5">
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: undefined };
              });
            }}
          >
            <button className={filterbtncss}>
              <TbFiltersFilled className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">All</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Electronics" };
              });
            }}
          >
            <button className={filterbtncss}>
              <FaMobileScreen className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Electronics</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Vehicles" };
              });
            }}
          >
            <button className={filterbtncss}>
              <FaCar className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Vehicles</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Furniture" };
              });
            }}
          >
            <button className={filterbtncss}>
              <GiSofa className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Furnichar</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Books" };
              });
            }}
          >
            <button className={filterbtncss}>
              <IoBookSharp className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Books</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Properties" };
              });
            }}
          >
            <button className={filterbtncss}>
              <FaHome className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Properties</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Fashion" };
              });
            }}
          >
            <button className={filterbtncss}>
              <FaTshirt className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Fashion</p>
          </div>
          <div
            className="text-center"
            onClick={() => {
              setquery((data) => {
                return { ...data, catagory: "Sports" };
              });
            }}
          >
            <button className={filterbtncss}>
              <MdSportsCricket className="text-5xl" />
            </button>
            <p className="text-center font-mono text-sky-900">Sports</p>
          </div>
        </div>

        <div>
          <button className="flex items-center gap-3 p-3 rounded-[5px] bg-sky-900 text-white shadow-gray-300 shadow-md hover:bg-sky-100 hover:text-sky-900 hover:shadow-md text-center lg:ml-0 ml-5 lg:mr-0 mr-5 ">
            <IoFilter className="text-xl text-sky-900 text-white" />
            <p>Filters</p>
          </button>
        </div>
      </div>

      {/* others filters */}
      <div className="fixed top-[20vh] lg:top-[10vh] z-10 lg:left-[20vw] left-[5vw] bg-white  shadow-xl shadow-black rounded-lg p-5 w-[90vw] lg:w-[60vw] h-[50vh] overflow-scroll hidden">
        <div>
          <p className="text-2xl font-semibold text-center text-sky-900">
            Filters
          </p>
          <p className="text-center text-gray-500">
            Select the filters you want to apply
          </p>
          <input type="range"  className="relative top-20 z-100" min={100} max={1000} onChange={(e)=>{console.log(e.target.value)}}/>
          <input type="range" className="relative top-20 right-[1vh] z-10" min={100} max={1000} onChange={(e)=>{console.log(e.target.value)}} />
          </div>
      </div>
    </>
  );
};
