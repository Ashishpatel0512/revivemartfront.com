// src/context/AuthContext.jsx
import React, { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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

    const login = (user) => setUser(user);
    console.log("hello user",user)

    return (
        <AuthContext.Provider value={{user,login,loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
