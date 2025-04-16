import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/usercontext";
import { useEffect } from "react";
function Logout() {
    const { user, login } = useAuth();
    useEffect(() => {
        console.log("logout start....")
        {
            confirm("⚠️ Are you sure you want to log out?") &&
            (localStorage.removeItem("token"),
            login(null))
        }
    },[])
   
return(
    <>
    <Navigate to="/" replace={true} />
    </>
)
}
export default Logout