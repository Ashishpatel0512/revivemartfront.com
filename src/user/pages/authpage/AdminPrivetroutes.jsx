import { Navigate } from "react-router-dom";
import { useState,useEffect } from "react";

const AdminPrivateRoute = ({ children }) => {
    const [admin, setadmin ] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:3000/admindata", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("*************************", data.user);
            setadmin(data?.user);
            setLoading(false);
          });
    }, []);
    console.log("admin......",admin)
  if (loading) {
    return <h2 className="text-center mt-[30%] text-5xl">Loading...</h2>; // Prevents flickering before authentication check
  }
  return admin ? children : <Navigate to="/adminlogin" />;
};

export default AdminPrivateRoute;
