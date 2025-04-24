import React, { useEffect } from "react";
import { Sidebar } from "../../component/Dashboard/Sidebar";
import { ProfileMain } from "../../component/Dashboard/ProfileMain";
import { useState } from "react";
import { useAuth } from "../../context/usercontext";
import { Followersfollowing } from "../../component/Dashboard/Followersfollowing";
import { Link, useParams } from "react-router-dom";
import { fetchuseralldata } from "../../services/services";
export const Visiteprofile = () => {
    const { userid } = useParams();
const [show, setshow] = useState("myproduct");
    const { user, login } = useAuth();
    const [count, setCount] = useState(12);

const [showproduct, setShowproduct] = useState([]);
const [User,setUser] = useState();
    
    useEffect(() => {
        fetchuseralldata(userid).then((data) => {
          console.log("data...", data.products);
            setShowproduct(data.listing);
            setUser(data.user);
        });
      }, []);
    
  console.log("user in profile..", user);
  // login("man")
  return (
    <>
      <div className="flex">
        {/* first */}
        <div>
          <Sidebar show={show} setshow={setshow} />
        </div>
        {/* second */}
        <div className="w-auto  ">
            {/* first */}
      <div className="h-[22vh] w-[85vw] bg-gray-50  border-gray-200">
        <div className="h-auto w-auto pt-5 ml-10 flex justify-left items-center gap-2">
          <img
            src={user?.image?.url}
            alt=""
            className="h-[15vh] w-[10vw] rounded-[10px] shadow-lg shadow-gray-300"
          />
          <div className="text-left text-gray-400 font-mono border-2 border-gray-200 p-2 rounded-[10px]">
            <p>{User?.name}</p>
            <p>{User?.emailid}</p>
            <div>
            <button>followers : {User?.follwers?.length} </button><br />
            <button>following : {User?.follwing?.length}</button>  
            </div>
          </div>
        </div>
      </div>
      {/* second */}
      <div className=" h-[78vh] w-[85vw] border-gray-300 border-t-2 overflow-y-auto">
        {/*cards product  */}
        {/* myproduct */}
      
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-10 ml-10 mr-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
                          {showproduct.slice(0, count).map((product) => (
                <Link
                to={`/details/${product._id}`}>
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
                  className="aspect-square rounded-lg bg-gray-50 object-fill rounded-md"
                  //   onClick={() => {
                //   setproductid(product._id);
                //  }}
                />
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
                {/* delete-edit btn */}
                {/* </Link> */}

                {/* <div className="flex justify-between">
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
                )} */}
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
      
      </div>
                  
        </div>
      </div>
      {/* followers followings
      <Followersfollowing/> */}
    </>
  );
};
