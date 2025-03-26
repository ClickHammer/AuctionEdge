import React from 'react'
import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import SubmitCommission from "./pages/SubmitCommission";
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/UserSlice';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchUser());
  },[]);
  
  return (
    <div>
      <Router>
      { <SideDrawer /> }
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/submit-commission" element={<SubmitCommission />} />
      <Route path="/how-it-works-info" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Router>
      { <ToastContainer position="top-right" /> }
      </div>
  );
};
export default App