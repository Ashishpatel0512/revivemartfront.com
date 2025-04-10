import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import  SimpleBadge  from "./NotifyIcon";
import { useAuth } from "../../context/usercontext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Notify } from "./Notify";
import { Suggestionbox } from "./Suggestionbox";
import VoiceSearch from "./Voiceanimation";
export const Navbar = ({
  products,
  showproduct,
  setShowproduct,
  locationtrue,
  setlocationtrue,
}) => {
  console.log("products", products);
  console.log("searchproducts .........",showproduct);
  const [text, setText] = useState("");
  const { user } = useAuth();
  const [shownotification, setshownotification] = useState(false);
  const [Notificationcount, setNotificationcount] = useState(0);
  console.log(user, "user in navbar");
  const location = useLocation();
  const [Voicestart,setVoicestart]=useState(false)
  const navstyle = `lg:bg-gradient-to-b from-gray-200 to-gray-100 bg-gray-800 fixed top-0 left-0 z-10 h-22 lg:h-16 w-full lg:flex
   ${location.pathname == "/" ? "justify-around" : "justify-between"} 
   lg:items-center lg:pt-[5vh] lg:pb-[6vh] lg:pl-2 lg:pr-2 shadow-md`;
  console.log("loction path:::::", location.pathname);

  // speech to text
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.onend = () => {
    setVoicestart(false);
  }

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
      {/* suggestionbox */}
      {Voicestart ?
        <VoiceSearch />
        : ""}
      <Suggestionbox showproduct={showproduct} setShowproduct={setShowproduct} />
      {/*  */}
      {/* notification */}
      {user ?
        <Notify shownotification={shownotification} setNotificationcount={setNotificationcount} />
        :
        ""}
      {/*  */}
      <div className={navstyle}>
        <Link to={"/"}>
          <h1 className="lg:ml-20 lg:text-2xl text-xl lg:mt-0 mt-1 ml-5 font-semibold lg:text-sky-900	text-white font-sans">
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
              className="p-1/2 pl-10 pr-2 lg:w-[50vw]  lg:mt-0 lg:ml-0  lg:border-2 lg:border-gray-100 lg:h-12 w-[80vw] h-10 mt-2 ml-5 rounded-md border bg-gray-100 border-2 border-gray-300"
            />
            <MdKeyboardVoice
              onClick={() => {
                recognition.start(),
                setVoicestart(true)
              }}
              className="text-2xl lg:text-black  text-white"
            />
          </form>
        ) : (
          ""
        )}

        <div className="lg:flex lg:justify-around lg:items-center  lg:gap-10  lg:static left-0 bottom-0 lg:w-auto  lg:h-auto lg:bg-transparent  lg:shadow-none flex items-center gap-5 justify-around fixed left-0 bottom-0 w-full h-16 bg-gray-600 lg:text-black text-white "> 
          <Link to={"/wishlist"}>
            <FaRegHeart className="text-2xl" />
          </Link>
          <Link to={"/chat"}>
            <BsChat className="text-2xl font-bold" />
          </Link>
          {/* notification */}
          <div onClick={() => setshownotification(!shownotification)}>
            <SimpleBadge  Notificationcount={Notificationcount}/>
          </div>
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
