import React from 'react'
import { Sidebar } from '../../component/Dashboard/Sidebar'
import { ProfileMain } from '../../component/Dashboard/profileMain'
import { useState } from 'react'
export const Profile = () => {
        const [show,setshow]=useState("myproduct");
  
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
