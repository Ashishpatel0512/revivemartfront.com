import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

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
          <button className="bg-gray-50 w-[70%] mb-5 font-mono shadow-gray-400 shadow-md rounded-[5px] hover:bg-sky-600 text-gray-800">
            Home
          </button>
        </Link>
        {location.pathname == "/profile" ?
          <div>
        <button
          className="bg-gray-50  focus:bg-sky-500 w-[70%] shadow-gray-400 shadow-lg mb-5 font-mono rounded-[5px] hover:bg-sky-600 text-gray-800"
          onClick={() => {
            setshow("myproduct");
          }}
        >
          Myproduct
        </button>

        <button
          className="bg-gray-50 w-[70%] focus:bg-sky-500 shadow-gray-400 shadow-lg mb-5 font-mono rounded-[5px] hover:bg-sky-600 text-gray-800"
          onClick={() => {
            setshow("mybids");
          }}
        >
          Mybids
        </button>

        <button className="bg-gray-50 w-[70%] focus:bg-sky-500 shadow-gray-400 shadow-lg font-mono rounded-[5px] hover:bg-sky-600 text-gray-800"  onClick={() => {
            setshow("myads");
          }}>
          Myads
            </button>
            </div>
        :""}
      </div>
    </div>
  );
};
