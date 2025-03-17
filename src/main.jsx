import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home } from "./user/pages/dashboardpage/Home";
import { Profile } from "./user/pages/dashboardpage/Profile";
import Details from "./user/pages/dashboardpage/Details";
import { Notfound } from "./user/pages/dashboardpage/Notfound";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/details", element: <Details /> },
  { path: "*", element: <Notfound/> },
]);

const App = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
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
