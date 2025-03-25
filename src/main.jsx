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
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/profile", element:(
     <PrivateRoute>
        <Profile />
    </PrivateRoute>
)  },
  { path: "/login", element: <Login /> },

  { path: "/details/:productid", element: (
    <PrivateRoute>
       <Details />
   </PrivateRoute>
)  },
{ path: "/wishlist", element: (
  <PrivateRoute>
     <Wishlist />
 </PrivateRoute>
)  },
{ path: "/chat", element: (
  <PrivateRoute>
     <Chat />
 </PrivateRoute>
)  },
  { path: "*", element: <Notfound/> },
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
