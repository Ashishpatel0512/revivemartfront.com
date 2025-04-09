import React, { useEffect, useState } from 'react'
import Userposts from './userposts';
import { Link } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { useAuth } from '../user/context/usercontext';

function Dashboard() {
  const {  socket } = useAuth();

    const [users,setusers]=useState([]);
    const [posts,setposts]=useState([]);
    const [showdata, setshowdata] = useState("userdata");
    const [showdatas,setshowdatas]=useState("userdata");
    const [showpage,setpage]=useState("details")
    const [userId, setuserid] = useState(null)
    const [approvepost, setapprovepost] = useState(false);
    const [rejectpost, setrejectpost] = useState(false);
    const [blockuser,setblockuser]=useState(false)
      useEffect(()=>{
        fetch(`http://localhost:3000/admin/userdata`)
        .then(res => res.json())
        .then((data) => {
          console.log("usersdata>>>>>>>",data)
          setusers(data.userdata);
          setposts(data.listdata)
        });

      }, [approvepost,rejectpost,blockuser])
  
  //approve
  const approveproduct=async(postId)=>{
    console.log("commmmmmmmmmmmm,,,,,,,",postId)
    const data=await fetch(`http://localhost:3000/admin/approveproduct/${postId}`,{
      method:"put",
       headers:{
        "Authorization":localStorage.getItem("token"),
     }
    })
   const result =await data.json()
   console.log(result);
   if(result.success){
     setapprovepost(!approvepost)
     //notification
     socket.emit("sendnotification", { receiver:result?.user?._id, message: 'Approve your product' });

   }
   else{
    setapprovepost(!approvepost)
  
   }
  }
  //reject
  const rejectproduct=async(postId)=>{
    console.log("commmmmmmmmmmmm,,,,,,,",postId)
    const data=await fetch(`http://localhost:3000/admin/rejectproduct/${postId}`,{
      method:"put",
       headers:{
        "Authorization":localStorage.getItem("token"),
     }
    })
   const result =await data.json()
   console.log(result);
   if(result.success){
     setrejectpost(!rejectpost)
     //notification
     socket.emit("sendnotification", { receiver:result?.user?._id, message: 'Reject your product' });

   }
   else{
    setrejectpost(!rejectpost)
  
   }
  }
  
  //block user
  const Blockuser=async(userid)=>{
    console.log("commmmmmmmmmmmm,,,,,,,",userid)
    const data=await fetch(`http://localhost:3000/admin/blockuser/${userid}`,{
      method:"put",
       headers:{
        "Authorization":localStorage.getItem("token"),
     }
    })
   const result =await data.json()
   console.log(result);
   if(result.success){
    setblockuser(!blockuser)
   }
   else{
    setblockuser(!blockuser)
  
   }
  }

  //Unblock user
  const UnBlockuser=async(userid)=>{
    console.log("commmmmmmmmmmmm,,,,,,,",userid)
    const data=await fetch(`http://localhost:3000/admin/unblockuser/${userid}`,{
      method:"put",
       headers:{
        "Authorization":localStorage.getItem("token"),
     }
    })
   const result =await data.json()
   console.log(result);
   if(result.success){
    setblockuser(!blockuser)
   }
   else{
    setblockuser(!blockuser)
  
   }
  }
  return (
    <>
    
    <div className="bg-gray-300	 h-screen w-screen">
        <div className='h-20 w-screen bg-black flex justify-between pl-5 pr-5 items-center	'>
           <h1 className='text-3xl font-bold text-white font-sans'>Admin Dashboard</h1>
           <h1 className='text-2xl font-bold text-white'>=</h1>
        </div>
        <div className='flex mt-6'>
            <div className="w-[20vw] h-[79vh] bg-black text-white text-center">
             <Link to={"/"}> <button  className='font-bold text-xl bg-gray-500 p-2 w-[70%] rounded-[5px] mt-20  pl-5 font-mono'>Home</button><br /></Link>
              <button onClick={()=>{setpage("details") ,setuserid(null)}} className='font-bold text-xl bg-gray-500 p-2 w-[70%] pl-5 rounded-[5px] font-mono mt-3 '>Dashboard</button><br />
              <button onClick={()=>{setpage("userdetails"),setshowdatas("userdata")}}  className='font-bold text-xl bg-gray-500 p-2 w-[70%] rounded-[5px] pl-5 mt-3 font-mono '>UserManagement</button>
              <button onClick={()=>{setpage("userdetails"),setshowdatas("productdatadata")}}  className='font-bold text-xl bg-gray-500 p-2 w-[70%] rounded-[5px] pl-5 mt-3 font-mono '>ProductManagement</button>

          </div>
            {userId==null?
             <div>
            {showpage=="details"?
             <div className='w-[75vw] h-[79vh]  ml-10'>
                <div className='flex w-[100%] text-center font-bold font-mono '>
                    <div className='w-[40%] h-[22vh] ml-20 mt-3 bg-white rounded-[10px] shadow-md shadow-black-300 content-center text-xl transition ease-in-out duration-700  hover:-translate-y-3 hover:shadow-lg' onClick={()=>{setshowdata("userdata")}}>
                        <h1 className='text-2xl'>Users</h1>
                        <h1 className='text-2xl text-blue-600 ' onClick={()=>{setshowdata("userdata")}}>{users.length}</h1>
                    </div>
                    <div  className='w-[40%] h-[22vh] ml-20 mt-3 bg-white rounded-[10px] shadow-md shadow-black-300 content-center text-xl transition ease-in-out duration-700  hover:-translate-y-3 hover:shadow-lg' onClick={()=>{setshowdata("postdata")}}>
                        <h1 className='text-2xl'>Posts</h1>
                        <h1 className='text-2xl text-blue-600' onClick={()=>{setshowdata("postdata")}}>{posts?.length}</h1>
                    </div>
                </div>
                <div className='w-[100%] text-center'>
                    
                    <div className='bg-white w-[87%] h-[50vh] ml-20 mt-9  rounded-[10px] overflow-y-scroll shadow-md shadow-black-300'>
                    {/* //userdata */}
                    {showdata=="userdata"?
                    <div className="p-4">
                    <h1 className='font-bold font-mono'>User Details</h1>

      <table className="table-auto border-collapse border border-gray-400 w-full mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-400 px-4 py-2">{user._id}</td>
              <td className="border border-gray-400 px-4 py-2">{user.name}</td>
              <td className="border border-gray-400 px-4 py-2">{user.emailid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    :
    <div className="p-4">
                    <h1 className='font-bold font-mono'>Post Details</h1>

      <table className="table-auto border-collapse border border-gray-400 w-full mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">PostId</th>
            <th className="border border-gray-400 px-4 py-2">PostTitle</th>
            <th className="border border-gray-400 px-4 py-2">PostUser</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id} className="text-center">
              <td className="border border-gray-400 px-4 py-2">{post._id}</td>
              <td className="border border-gray-400 px-4 py-2">{post.name}</td>
              <td className="border border-gray-400 px-4 py-2">{post.User[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
                    </div>
                </div>
             </div>:
                <div className='w-[75vw] h-[79vh]  ml-10 overflow-y-scroll'>
                  {showdatas == "userdata" ?
                    <div className='bg-blue w-[90%] h-[100%] mt-10 ml-10 flex flex-wrap gap-10'>
                      {users.map((user) => (
                        <div className='w-[20vw] h-[35vh] bg-gray-200 shadow-lg shadow-black-300 text-center  border-1 border-white font-mono'>
                          <div><img src={user?.image?.url} alt="" className='h-20 w-20 rounded-full ml-[40%] mt-4' /></div>
                          <div className='mt-2'>{user._id}</div>
                          <div>{user.name}</div>
                          <div>{user.emailid}</div>
                          <div className='flex w-[100%] gap-10 justify-center mt-10 text-white	'>
                            <button className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { setuserid(user._id) }}>posts</button>
                            {user.status=="Active"?
                              < button className='bg-red-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={()=>{Blockuser(user._id)}}>block</button>
                             :
                            <button className='bg-gray-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={()=>{UnBlockuser(user._id)}}>Unblock</button>
                             }
                          </div>
                        </div>
                      ))}
                
                    </div>
                    :
                    <div className='bg-blue w-[90%] h-[100%] mt-10 ml-10 flex flex-wrap gap-10'>
                      {posts.map((post) => (
                        <div className='w-[20vw] h-[50vh] bg-gray-200 shadow-lg relative shadow-black-300 text-center  border-1 border-white font-mono'>
                          {post.status == 'Approve' ? <FcApproval className='text-2xl absolute top-2 left-2' /> : ''}
                          {post.status == 'Reject' ? <ImCross className='text-xl absolute top-2 left-2 text-red-600' /> : ''}
                          <img src={post?.image[0]?.url} alt="" className='h-[30vh] w-[100%]' />
                          <div>{post._id}</div>
                          <div>{post.name}</div>
                          <div className='flex w-[100%] gap-10 justify-center mt-3 text-white mb-1	'>
                            <Link to={`/details/${post?._id}`} className='bg-blue-500 w-[35%] text-lg rounded-[5px] font-mono'>SEE</Link>
                  
                            {/* <button className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { setpostid(post?._id) }}>see</button> */}
                            {/* {postid == post?._id && <Postdetails postid={post?._id} setpostid={setpostid} />} */}
                  
                            <button className='bg-red-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { Delpost(post?._id) }}>delete</button>
                          </div>
                          {/* approve-reject btn */}
                          <div className='flex w-[100%] gap-10 justify-center mt-2 text-white mb-2	'>
                          <button className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { approveproduct(post?._id) }}>Approve</button>
                          <button className='bg-gray-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { rejectproduct(post?._id) }}>Reject</button>
                          </div>
                        </div>
                      ))}
                                  
                    </div>
                  }
                  {/* // */}
                 </div>
            }
            </div>:
                <Userposts userId={userId}/>

              }
            
        </div>
    </div>
    {/* //usermanagement */}
    {/* <div className='bg-blue w-screen h-screen mt-10 ml-10 flex flex-wrap gap-10'>
    {users.map((user) => (
            <div  className='w-[25vw] h-[35vh] bg-gray-200 shadow-lg shadow-black-300 text-center  border-1 border-white font-mono'>
            <div><img src={user?.image?.url} alt="" className='h-20 w-20 rounded-full ml-[40%]' /></div>
            <div>{user._id}</div>
            <div>{user.name}</div> 
            <div>{user.emailid}</div> 
            <div className='flex w-[100%] gap-10 justify-center mt-10 text-white	'>
              <button className='bg-red-500 w-[35%] text-lg rounded-[5px] font-mono'>posts</button>
              <button className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono'>block</button>
            </div>
      </div>
          ))}
       
    </div> */}
    {/* //posts */}
    {/* <Userposts userId={userId}/> */}
    </>
  )
}

export default Dashboard