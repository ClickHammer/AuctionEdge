import React from 'react'
import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
const App = () => {
  
  return (
    <div>
      <Router>
      { <SideDrawer /> }
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
      { <ToastContainer position="top-right" /> }
      </div>
  );
};
export default App