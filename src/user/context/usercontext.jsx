// src/context/AuthContext.jsx
import React, { createContext, useContext, useState,useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3000");


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
     const [receiver, setReceiver] = useState();

   //fetch user
    useEffect(()=>{
        fetch("http://localhost:3000/user",
            {
              headers:{
                "Authorization":localStorage.getItem("token")
            },
            }
          )
              .then(res => res.json())
              .then((data) => {
                console.log("*************************",data.user)
                if(data.success){
                    setUser(data.user)
                  }
                setLoading(false)
              });
     },[])
   
   
     // soket connectons
     useEffect(() => {

      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      console.log(".......................soket connected........................")

      // newSocket.on("receiveMessage", (msg) => {
      //   setMessages((prev) => [...prev, msg]);
      // });
  
      return () => newSocket.disconnect();
    }, []);
  

    //register user
   useEffect(()=>{
      if (user) {
        console.log("hello user register......")
        socket.emit("register", user._id);
    };
   },[user,setUser])


    const login = (user) => setUser(user);
    console.log("hello user",user)

    return (
        <AuthContext.Provider value={{user,login,loading,socket,receiver, setReceiver}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
