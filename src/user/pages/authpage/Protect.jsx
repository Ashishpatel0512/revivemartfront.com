import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/usercontext";

const PrivateRoute = ({ children }) => {
  const { user,loading } = useAuth();
  if (loading) {
    return <h2 className="text-center mt-[30%] text-5xl">Loading...</h2>; // Prevents flickering before authentication check
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
