import React from 'react'
import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SideDrawer from "./layout/SideDrawer";
import Home from "./pages/Home.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
const App = () => {
  
  return (
    <div>
      <Router>
      {/* { <SideDrawer /> } */}
      <Routes>
      <Route path='/' element={<Home/>} />
      </Routes>
      </Router>
      {/* { <ToastContainer position="top-right" /> } */}
      </div>
  );
};
export default App