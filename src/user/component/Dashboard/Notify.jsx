import React from 'react'
import { useAuth } from '../../context/usercontext';
import { useEffect, useState } from "react";
import { deletenotification, fetchnotification } from '../../services/services';
import { IoCaretUpSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

export const Notify = ({shownotification,setNotificationcount}) => {
  const { user, socket, receiver, setReceiver } = useAuth();
  const [deletenotify, setdeletenotify] = useState(false);
  const [notification, setNotification] = useState();
     useEffect(() => {
       notification && setNotificationcount(notification.length);
        console.log("Notification count updated:", notification?.length);
     }, [notification, setNotification])
  
    useEffect(() => {
        if (!socket) return;
        socket.on("receivenotification", ({ receiver, message }) => {
          console.log("Notification received:", receiver, message);
          setNotification((data)=>{return [ {message, receiver,createAt:Date.now()},...data]});
        });
        return () => socket.off("receivenotification");
      }, []);
    
      useEffect(()=>{
        fetchnotification().then((data) => {
          console.log("Notification fetched successfully!", data.Notification);
          setNotification(data.Notification);
        })
      }, [deletenotify])
  console.log("Notification:", notification);
  
  return (
    <div className={`fixed top-24 right-10 bg-white shadow-lg rounded-lg h-[30vh] w-[20vw] overflow-y-scroll shadow-3xl shadow-black ${shownotification ? "" : "hidden"}`}>
      {/* <h1 className='text-center mb-2'>Notification</h1> */}
      <IoCaretUpSharp  className='fixed top-20 right-[15%] text-2xl text-gray-500'/>
        {notification && notification.map((data, index) => {
                return (
                  <div key={index} className='p-2 border-b-2  border-gray-300 bg-white'>
                    <div className='flex justify-between'>
                    <h3>{data.message}</h3>
                    <RxCross1 className='text-sm' onClick={()=>{deletenotification(data._id),setdeletenotify(!deletenotify)}} />
                    </div>
                    <p className='text-[10px] mt-2'>{new Date(data.createAt).toLocaleTimeString('en-US', {
                     hour: '2-digit',
                     minute: '2-digit',
                     hour12: true
                    })}
                      </p>
                    {/* <h4>{data.receiver}</h4> */}


                </div>
                )
            })}
    </div>
  )
}
