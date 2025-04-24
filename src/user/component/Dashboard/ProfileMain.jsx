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
import { fetchuserbids, fetchuserproduct ,promote} from "../../services/services";
import { Link } from "react-router-dom";
import { deleteproduct } from "../../services/services";
import Editproductform from "./Editproduct";
import { Followersfollowing } from "./Followersfollowing";
import { findpromote } from "../../services/services";
export const ProfileMain = ({ show }) => {
  const { user } = useAuth();
  const [showproduct, setShowproduct] = useState([]);
  const [showbids, setShowbids] = useState([]);
  const [ads, setads] = useState([]);
  const [reads,setreads] = useState(false);
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
  }, [form, delproduct, setdelproduct,editproduct]);

  useEffect(() => {
    fetchuserbids().then((data) => {
      console.log("data...", data.bids);
      setShowbids(data.bids);
    });
  }, []);

  useEffect(() => {
    findpromote().then((data) => {
      console.log("data...", data.ads);
      const Data= data.ads.filter((ads) => ads.Productid.User[0] == user._id);
      setads(Data);
    });
  }, [reads,setreads]);

  console.log("ads", ads);

  return (
    <>
      {/* first */}
      <div className="h-[22vh] w-[85vw] bg-gray-50  border-gray-200">
        <div className="h-auto w-auto pt-5 ml-10 flex justify items-center gap-2">
          <img
            src={user?.image?.url}
            alt=""
            className="h-[15vh] w-[10vw] rounded-[10px] shadow-lg shadow-gray-300"
          />
          <div className="text-left  text-gray-700 font-mono border-2 border-gray-200 p-2 rounded-[10px]">
            <p >{user.name}</p>
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
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
            {showproduct.reverse().map((product) => (
              
              <div
                className="shadow-md shadow-gray-500 bg-white p-3 rounded-[10px]  text-center"
                // onClick={() => {
                //   setproductid(product._id);
                // }}
              >
                {/* like */}
                {/* <IoIosHeartEmpty  className="relative top-7 left-[90%] text-gray-600" /> */}

                {/* <Link to={`/details/${product._id}`} className="group"> */}
                {ads.some(ads => ads.Productid._id === product._id) ?
                ""
                  : <h1 onClick={()=>{ promote(product._id),setreads(!reads),alert('Product Promote Successfully')}} className="text-white bg-gray-600 w-[40%] relative bottom-3 right-3 rounded-br-full mb-2 hover:bg-green-400 pointer"> promote</h1>}
                <img
                  alt=""
                  src={product.image[0].url}
                    className="aspect-square rounded-lg bg-gray-50 object-fill rounded-md"
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
                          alert("Deleted product")
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
            <div>
              {show == "mybids" ?
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
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
                            className="aspect-square rounded-lg bg-gray-50 object-fill rounded-md"
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
                </div>
                :
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">

                  {ads.slice(0, count).map((ads) => (
              
                    <div
                      className="shadow-md shadow-gray-500 bg-white p-3 rounded-[10px]  text-center"
                    // onClick={() => {
                    //   setproductid(product._id);
                    // }}
                    >
                      {/* like */}
                      {/* <IoIosHeartEmpty  className="relative top-7 left-[90%] text-gray-600" /> */}

                      {/* <Link to={`/details/${product._id}`} className="group"> */}
                      {/* {ads.some(ads => ads.Productid._id === product._id) ?
                ""
                  : <h1 onClick={()=>{ promote(product._id),setreads(!reads)}} className="text-white bg-gray-300 rounded-full mb-5 hover:bg-green-400"> promote</h1>} */}
                      <img
                        alt=""
                        src={ads?.Productid?.image[0]?.url}
                        className="aspect-square rounded-lg bg-gray-50 object-fill rounded-md"
                        onClick={() => {
                          setproductid(ads.Productid._id);
                        }}
                      />
                      <h3 className="mt-4 text-sm text-gray-700">{ads.Productid.name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {ads.Productid.price}
                      </p>
                      {/* delete-edit btn */}
                      {/* </Link> */}

                      {/* <div className="flex justify-between">
                        <div>
                          <MdDelete
                            className="text-xl text-gray-500"
                            onClick={() => {
                              deleteproduct(ads.Productid._id).then((data) => {
                                setdelproduct(!delproduct);
                              });
                            }}
                          />
                        </div>
                        <MdEdit
                          className="text-xl text-gray-500"
                          onClick={() => {
                            seteditsproduct(ads.Productid), seteditproduct(true);
                          }}
                        />
                      </div> */}
                      {productid === ads.Productid._id ? (
                        <Showbids productid={productid} setproductid={setproductid} product={ads.Productid} />
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
              }
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
