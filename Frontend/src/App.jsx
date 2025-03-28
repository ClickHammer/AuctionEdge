import React from 'react'
import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import Leaderboard from "./pages/Leaderboard";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import SubmitCommission from "./pages/SubmitCommission";
import { useDispatch } from 'react-redux';
import { fetchLeaderboard, fetchUser } from './store/slices/UserSlice';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import { getAllAuctionItems } from './store/slices/auctionSlice';
import Auctions from "./pages/Auctions";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuctions from "./pages/ViewMyAuctions";
import ViewAuctionDetails from "./pages/ViewAuctionDetails";
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchUser()),
    dispatch(getAllAuctionItems(),
  dispatch(fetchLeaderboard()));
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
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/auctions" element={<Auctions />} />
      <Route path="/auction/item/:id" element={<AuctionItem />} />
      <Route path="/create-auction" element={<CreateAuction />} />
      <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
      <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
      </Routes>
      </Router>
      { <ToastContainer position="top-right" /> }
      </div>
  );
};
export default App