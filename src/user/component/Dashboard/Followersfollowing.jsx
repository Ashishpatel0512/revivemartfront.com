import React, { useEffect,useState } from 'react'
import { followersdetails, followfunction } from '../../services/services'
import { useAuth } from '../../context/usercontext'
import { ImCross } from "react-icons/im";

export const Followersfollowing = ({showfollow, setshowfollow}) => {
    const [followers, setfollowers] = useState([])
    const [following, setfollowing] = useState([])
    const [Following, setfollow] = useState(false);
    // const [showfollow, setshowfollow] = useState('following')
    const { user } = useAuth();


    useEffect(() => {
        followersdetails().then((data) => {
            console.log("followers data", data)
            setfollowers(data.followers)
            setfollowing(data.following)
        })
    }, [Following, setfollow])
  
    return (
    <>
            {showfollow == 'followers' ?
                        <div className='h-[100vh] w-[100vw] bg-black fixed top-0 left-0 bg-opacity-50'>

                < div className='mt-20 h-[50vh] w-[40vw] bg-white rounded-lg fixed top-[15vh] left-[30vw] shadow-md '>
            <div className='flex justify-center items-center h-[10vh] w-full bg-gray-200 rounded-t-lg'>
                <h1 className='text-xl font-bold text-center'>Followers</h1>
                <button className='text-2xl font-bold absolute top-3 right-5' onClick={() => {setshowfollow(undefined) }}><ImCross /></button>
            </div>
            <div className='h-[40vh] w-full overflow-scroll'>
                {followers.map((follower) => (
                    
                    <div>
                        <div className='flex justify-between items-center gap-5 m-3'>
                            <div className='flex justify-start items-center gap-5'>
                                <img src={follower?.image?.url} alt="" className='h-10 w-10 rounded-full' />
                                <p className='text-lg font-semibold'>{follower.name}</p>
                            </div>
                            <button className='p-2 bg-sky-900 text-white rounded-md'>follow</button>
                        </div>
                         
                        <hr className='border-b-2 border-gray-300' />
                    </div>
                ))}
            </div>
               
        </div></div> :""} 
{
    showfollow == 'following' ?
    <div className='h-[100vh] w-[100vw] bg-black fixed top-0 left-0 bg-opacity-50'>

          <div className='mt-20 h-[50vh] w-[40vw] bg-white rounded-lg fixed top-[15vh] left-[30vw] shadow-md'>
                <div className='flex justify-center items-center h-[10vh] w-full bg-gray-200 rounded-t-lg'>
                    <h1 className='text-xl font-bold text-center'>Following</h1>
                    <button className='text-2xl font-bold absolute top-3 right-5' onClick={()=>{setshowfollow(undefined)}}><ImCross />  </button>
                </div>
              <div className='h-[40vh] w-full overflow-scroll'>
                  {following.map((following) => (
                    
                      <div>
                          <div className='flex justify-between items-center gap-5 m-3'>
                              <div className='flex justify-start items-center gap-5'>
                                  <img src={following?.image?.url} alt="" className='h-10 w-10 rounded-full' />
                                  <p className='text-lg font-semibold'>{following.name}</p>
                              </div>
                             
                              <button className='p-2 bg-sky-900 text-white rounded-md' onClick={() => {
                                   setfollow(true);
                                   followfunction(following._id).then((data) => {
                                     setfollow(false);
                                   });
                                 }}>unfollow</button>
                                
                          </div>
                         
                          <hr className='border-b-2 border-gray-300' />
                      </div>
                  ))}
                </div>
               
          </div> </div>:""}
     </>
  )
}
