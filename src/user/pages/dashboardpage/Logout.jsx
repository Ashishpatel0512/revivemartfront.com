import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/usercontext";
import { useEffect } from "react";
function Logout() {
    const { user, login } = useAuth();
    useEffect(() => {
        console.log("logout start....")
        {
            confirm("you are logout") &&
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