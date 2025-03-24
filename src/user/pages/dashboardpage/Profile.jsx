import React from 'react'
import { Sidebar } from '../../component/Dashboard/Sidebar'
import { ProfileMain } from '../../component/Dashboard/profileMain'
import { useState } from 'react'
import { useAuth } from '../../context/usercontext'
export const Profile = () => {
        const [show,setshow]=useState("myproduct");
        const {user,login}=useAuth();
        console.log("user in profile..",user)
        // login("man")
  return (
    <>
    <div className='flex'>
      {/* first */}
      <div>
          <Sidebar show={show} setshow={setshow}/>
      </div>
      {/* second */}
      <div className='w-auto  '>
       <ProfileMain show={show}/>
      </div>
    </div>
  
    </>
  )
}
