import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./user/pages/dashboardpage/Home";
import { Profile } from "./user/pages/dashboardpage/Profile";
import Details from "./user/pages/dashboardpage/Details";
import { Notfound } from "./user/pages/dashboardpage/Notfound";
import { AuthProvider } from "./user/context/usercontext";
import PrivateRoute from "./user/pages/authpage/Protect";
import Login from "./user/pages/authpage/login";
import { Wishlist } from "./user/pages/dashboardpage/Wishlist";
import { Chat } from "./user/pages/dashboardpage/Chat";
import Editproductform from "./user/component/Dashboard/Editproduct";
import Dashboard from "./admin/dashboard";
import Register from "./user/pages/authpage/register";
import Forgot from "./user/pages/authpage/forgot";
import AdminLogin from "./user/pages/authpage/Adminlogin";
import AdminPrivateRoute from "./user/pages/authpage/AdminPrivetroutes";
import { Visiteprofile } from "./user/pages/dashboardpage/Visiteprofile";
import Logout from "./user/pages/dashboardpage/Logout";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/editproduct", element: <Editproductform/> },
  {
    path: "/dashboard",
    element: (
      <AdminPrivateRoute>
        <Dashboard />
      </AdminPrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/adminlogin", element: <AdminLogin /> },

  
  {
    path: "/Register",
    element:<Register/>,
  },
  {
    path: "/forgot",
    element: <Forgot />

  },
  {
    path: "/logout",
    element: <Logout />

  },

  {
    path: "/details/:productid",
    element: (
      // <PrivateRoute>
        <Details />
      // </PrivateRoute>
    ),
  },
  
  {
    path: "/visite/:userid",
    element: (
      // <PrivateRoute>
        <Visiteprofile/>
      // </PrivateRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <Wishlist />
      </PrivateRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <Notfound /> },
]);

const App = () => (
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </StrictMode>
);

createRoot(document.getElementById("root")).render(<App />);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
