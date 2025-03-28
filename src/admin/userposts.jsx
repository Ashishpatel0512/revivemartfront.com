import React, { useState,useEffect } from 'react'
// import Postdetails from '../pages/postdetails';
import { Link } from 'react-router-dom';
function Userposts({userId}) {

      const [posts,setposts]=useState([]);
      const [postid, setpostid] = useState("");
      const [deletepost,setdelpost]=useState(false)


       useEffect(()=>{
            fetch(`http://localhost:3000/admin/userdata/${userId}`)
            .then(res => res.json())
            .then((data) => {
              console.log("usersdata>>>>>>>",data)
            //   setusers(data.user);
              setposts(data.lists)
            });
    
        },[deletepost,setdelpost])
        // delete post
        const Delpost=async(postId)=>{
          console.log("commmmmmmmmmmmm,,,,,,,",postId)
          const data=await fetch(`http://localhost:3000/admin/deletepost/${postId}`,{
            method:"delete",
             headers:{
              "Authorization":localStorage.getItem("token"),
           }
          })
         const result =await data.json()
         console.log(result);
         if(result.success){
          setdelpost(!deletepost)
         }
         else{
          setdelpost(!deletepost)
        
         }
         }
        
        
  return (
    
    <>
     <div className='w-[75vw] h-[79vh]  ml-10 overflow-y-scroll'>
             <div className='bg-blue w-[90%] h-[100%] mt-10 ml-10 flex flex-wrap gap-10'>
             {posts.map((post) => (
                     <div  className='w-[20vw] h-[50vh] bg-gray-200 shadow-lg shadow-black-300 text-center  border-1 border-white font-mono'>
                        <img src={post?.image[0]?.url} alt="" className='h-[30vh] w-[100%]'/>
                        <div>{post._id}</div>
                        <div>{post.name}</div>
                     <div className='flex w-[100%] gap-10 justify-center mt-10 text-white mb-2	'>
                      <Link to={`/details/${post?._id}`} onClick={() => { setpostid(post?._id) }} className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono'>SEE</Link>

                       {/* <button className='bg-green-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={() => { setpostid(post?._id) }}>see</button> */}
                       {/* {postid == post?._id && <Postdetails postid={post?._id} setpostid={setpostid} />} */}

                       <button className='bg-red-500 w-[35%] text-lg rounded-[5px] font-mono' onClick={()=>{Delpost(post?._id)}}>delete</button>
                     </div>
               </div>
                   ))}
                
             </div>
             </div>
    </>
  )
}

export default Userposts