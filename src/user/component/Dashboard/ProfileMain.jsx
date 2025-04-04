import React from "react";
import { useState } from "react";
import { Cards } from "./Cards";
import { useEffect } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdLocalOffer } from "react-icons/md";
import Dropdown from "./profiledropdown";
import Profileform from "./Profileform";
import Dpedit from "./editdp";
import EditProfile from "./editprofile";
import { Showbids } from "./showbids";
import { useAuth } from "../../context/usercontext";
import { fetchuserbids, fetchuserproduct } from "../../services/services";
import { Link } from "react-router-dom";
import { deleteproduct } from "../../services/services";
import Editproductform from "./Editproduct";
import { Followersfollowing } from "./Followersfollowing";

export const ProfileMain = ({ show }) => {
  const { user } = useAuth();
  const [showproduct, setShowproduct] = useState([]);
  const [showbids, setShowbids] = useState([]);

  const [count, setCount] = useState(8);
  const [form, setform] = useState(false);
  const [uploadform, setuploadform] = useState(false);
  const [updateform, setupdateform] = useState(false);
  const [delproduct, setdelproduct] = useState(false);
  const [productid, setproductid] = useState(false);
  const [editproduct, seteditproduct] = useState(false);
  const [editsproduct, seteditsproduct] = useState("");
  const [showfollow, setshowfollow] = useState(undefined);
  
  useEffect(() => {
    fetchuserproduct().then((data) => {
      console.log("data...", data.products);
      setShowproduct(data.products);
    });
  }, [form, delproduct, setdelproduct]);

  useEffect(() => {
    fetchuserbids().then((data) => {
      console.log("data...", data.bids);
      setShowbids(data.bids);
    });
  }, []);

  return (
    <>
      {/* first */}
      <div className="h-[22vh] w-[85vw] bg-gray-50  border-gray-200">
        <div className="h-auto w-auto pt-5 ml-10 flex justify-left items-center gap-2">
          <img
            src={user?.image?.url}
            alt=""
            className="h-[15vh] w-[10vw] rounded-[10px] shadow-lg shadow-gray-300"
          />
          <div className="text-left text-gray-400 font-mono border-2 border-gray-200 p-2 rounded-[10px]">
            <p className="mb-2">{user.name}</p>
            <p>{user.emailid}</p>
            <div>
            <button onClick={()=>{setshowfollow('followers')}}>followers : {user.follwers?.length} </button><br />
            <button onClick={()=>{setshowfollow('following')}}>following : {user.follwing?.length}</button>  
            </div>
          </div>
        </div>
      </div>
      {/* second */}
      <div className=" h-[78vh] w-[85vw] border-gray-300 border-t-2 overflow-y-auto">
        {/*cards product  */}
        {/* myproduct */}
        {show == "myproduct" ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
            {showproduct.slice(0, count).map((product) => (
              <div
                className="shadow-md shadow-gray-500 bg-white p-3 rounded-[10px]  text-center"
                // onClick={() => {
                //   setproductid(product._id);
                // }}
              >
                {/* like */}
                {/* <IoIosHeartEmpty  className="relative top-7 left-[90%] text-gray-600" /> */}

                {/* <Link to={`/details/${product._id}`} className="group"> */}
                <img
                  alt=""
                  src={product.image[0].url}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8" 
                  onClick={() => {
                  setproductid(product._id);
                 }}
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
                {/* delete-edit btn */}
                {/* </Link> */}

                <div className="flex justify-between">
                  <div>
                    <MdDelete
                      className="text-xl text-gray-500"
                      onClick={() => {
                        deleteproduct(product._id).then((data) => {
                          setdelproduct(!delproduct);
                        });
                      }}
                    />
                  </div>
                  <MdEdit
                    className="text-xl text-gray-500"
                    onClick={() => {
                      seteditsproduct(product), seteditproduct(true);
                    }}
                  />
                </div>
                {productid === product._id ? (
                  <Showbids productid={productid} setproductid={setproductid} product={product} />
                ) : (
                  ""
                )}
              </div>
            ))}
            <button
              className=" bg-black text-white text-center p-0"
              onClick={() => {
                setCount(count + 4);
              }}
            >
              More..
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20">
            {showbids.slice(0, count).map((bid) => (
              <Link to={`/details/${bid.Productid._id}`}>
                <div className="shadow-md shadow-gray-500 bg-white p-3 rounded-[10px]  hover:bg-sky-100 hover:text-sky-900 hover:shadow-md text-center">
                  {/* bids */}
                  <div className="flex justify-between">
                    <MdLocalOffer className="text-xl" />
                    <h1 className="font-mono bg-sky-700 text-white mb-2 text-lg font-bold rounded-[5px] p-2">
                      <p className="text-sm text-gray-300">OFFER-PRICE</p>
                      {bid.bidamount}&#8377;
                    </h1>
                  </div>

                  {/* like */}
                  {/* <IoIosHeartEmpty  className="relative top-7 left-[90%] text-gray-600" /> */}

                  <a key={bid._id} href={""} className="group">
                    <img
                      alt=""
                      src={bid.Productid.image[0].url}
                      className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                    />
                    <h3 className="mt-4 text-sm text-gray-700">
                      {bid.Productid.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {bid.Productid.price}
                    </p>
                  </a>
                </div>
              </Link>
            ))}
            <button
              className=" bg-black text-white text-center p-0"
              onClick={() => {
                setCount(count + 4);
              }}
            >
              More..
            </button>
          </div>
        )}
      </div>
      {/* all about like dropdown form edit dp change*/}
      <Dropdown
        form={form}
        setform={setform}
        uploadform={uploadform}
        setuploadform={setuploadform}
        updateform={updateform}
        setupdateform={setupdateform}
      />
      <Profileform form={form} setform={setform} />
      <Dpedit uploadform={uploadform} setuploadform={setuploadform} />
      <EditProfile updateform={updateform} setupdateform={setupdateform} />
      {editproduct ? (
        <Editproductform
          editproduct={editproduct}
          seteditproduct={seteditproduct}
          editsproduct={editsproduct}
          seteditsproduct={seteditsproduct}
        />
      ) : (
        ""
      )}
      {/* showbids */}
      {/* <Showbids/> */}
      {/* followers followings */}
      <Followersfollowing showfollow={ showfollow} setshowfollow={setshowfollow} />
    </>
  );
};
