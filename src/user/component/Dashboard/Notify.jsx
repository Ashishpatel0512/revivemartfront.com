import React from 'react'
import { useAuth } from '../../context/usercontext';
import { useEffect, useState } from "react";
import { fetchnotification } from '../../services/services';

export const Notify = ({shownotification,setNotificationcount}) => {
      const { user, socket, receiver, setReceiver } = useAuth();
  const [notification, setNotification] = useState();
     useEffect(() => {
       notification && setNotificationcount(notification.length);
        console.log("Notification count updated:", notification?.length);
     }, [notification, setNotification])
  
    useEffect(() => {
        if (!socket) return;
        socket.on("receivenotification", ({ receiver, message }) => {
          console.log("Notification received:", receiver, message);
          setNotification((data)=>{return [ {message, receiver},...data]});
        });
        return () => socket.off("receivenotification");
      }, []);
    
      useEffect(()=>{
        fetchnotification().then((data) => {
          console.log("Notification fetched successfully!", data.Notification);
          setNotification(data.Notification);
        })
      }, [])
  console.log("Notification:", notification);
  
  return (
    <div className={`fixed top-24 right-10 bg-white p-4 shadow-lg rounded-lg h-[30vh] w-[30vw] overflow-y-scroll ${shownotification ? "" : "hidden"}`}>
            <h1>Notification</h1>
            {notification && notification.map((data, index) => {
                return (
                <div key={index} className='p-2 border-b-2 border-gray-300 mb-2  rounded-lg'>
                    <h3>{data.message}</h3>
                    <h4>{data.receiver}</h4>
                </div>
                )
            })}
    </div>
  )
}
