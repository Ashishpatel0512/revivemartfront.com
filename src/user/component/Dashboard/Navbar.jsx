import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

import { useAuth } from "../../context/usercontext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export const Navbar = ({
  products,
  setShowproduct,
  locationtrue,
  setlocationtrue,
}) => {
  console.log("products", products);
  const [text, setText] = useState("");
  const { user } = useAuth();
  console.log(user, "user in navbar");
  const location = useLocation();
  const navstyle = `bg-gradient-to-b fixed top-0 left-0 z-10 from-gray-200 to-gray-100 h-16 w-full flex
   ${location.pathname == "/" ? "justify-around" : "justify-between"} 
   items-center pt-[5vh] pb-[6vh] pl-2 pr-2 shadow-md`;
  console.log("loction path:::::", location.pathname);

  // speech to text
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = false;

  recognition.onresult = function (event) {
    const searchQuery = event.results[0][0].transcript;
    console.log("Search Query:", searchQuery);
    setText(searchQuery); // Set input field
    setShowproduct(
      products.filter((product) =>
        new RegExp(searchQuery, "gi").test(product.name)
      )
    );
  };

  return (
    <>
      <div className={navstyle}>
        <Link to={"/"}>
          <h1 className="ml-20 text-2xl font-semibold text-sky-900	font-sans">
            ReviveMart
          </h1>
        </Link>
        {location.pathname == "/" ? (
          <form action="" className="flex items-center gap-2">
            <input
              type="search"
              placeholder=" Search for products..."
              value={text}
              onChange={(e) => {
                setText(e.target.value),
                  setShowproduct(
                    products.filter((product) =>
                      new RegExp(e.target.value, "gi").test(product.name)
                    )
                  );
              }}
              className="p-1/2 pl-10 pr-2 w-[50vw] h-12 rounded-md border bg-gray-100"
            />
            <MdKeyboardVoice
              onClick={() => {
                recognition.start();
              }}
              className="text-2xl"
            />
          </form>
        ) : (
          ""
        )}

        <div className="flex justify-around items-center gap-10">
          <Link to={"/wishlist"}>
            <FaRegHeart className="text-2xl" />
          </Link>
          <Link to={"/chat"}>
            <BsChat className="text-2xl font-bold" />
          </Link>
          {location.pathname == "/" ? (
            <div className="flex items-center">
              <IoLocation className="text-2xl text-skay-300" />
              <p
                className="text-skay-300 ml-2"
                onClick={() => {
                  setlocationtrue(!locationtrue);
                }}
              >
                Location
              </p>
            </div>
          ) : (
            ""
          )}
          {user ? (
            <Link to={"/profile"}>
              <img
                src={user?.image?.url}
                alt=""
                className="h-10 w-10 rounded-full"
              />
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="mr-8 p-1 pl-5 pr-5 rounded-md bg-sky-900	text-white ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
