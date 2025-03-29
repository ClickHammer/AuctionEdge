import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/UserSlice.js";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg"; 

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
    
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#15317E] text-white text-3xl p-2 rounded-md lg:hidden"
      >
        <GiHamburgerMenu />
      </div>

      <div
        className={`w-[300px] bg-white h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-200 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-gray-300`}
      >
      
        <div className="flex flex-col items-center gap-1 p-4">
          <img src={Logo} alt="AuctionEdge Logo" className="w-16 h-16 fill-current" />
          <h4 className="text-2xl font-bold tracking-wide uppercase text-[#15317E]">
            Auction<span className="text-[#7D6115]">Edge</span>
          </h4>
        </div>

        <ul className="flex flex-col gap-4 text-lg font-semibold text-gray-800">
          <li>
            <Link to={"/auctions"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
              <RiAuctionFill /> Auctions
            </Link>
          </li>
          <li>
            <Link to={"/leaderboard"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
              <MdLeaderboard /> Leaderboard
            </Link>
          </li>

          {isAuthenticated && user?.role === "Auctioneer" && (
            <>
              <li>
                <Link to={"/submit-commission"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
                  <FaFileInvoiceDollar /> Submit Commission
                </Link>
              </li>
              <li>
                <Link to={"/create-auction"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
                  <IoIosCreate /> Create Auction
                </Link>
              </li>
              <li>
                <Link to={"/view-my-auctions"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
                  <FaEye /> View My Auctions
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && user?.role === "Super Admin" && (
            <li>
              <Link to={"/dashboard"} className="flex items-center gap-1 hover:text-[#7D6115] transition">
                <MdDashboard /> Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex flex-col items-center gap-2 my-2">
          {!isAuthenticated ? (
            <>
        <Link
  to={"/sign-up"}
  className="w-full text-center bg-[#15317E] text-white py-2 rounded-md border-2 border-transparent 
  hover:border-[#15317E] hover:text-[#15317E] hover:bg-[#ffffff] transition"
>
  Sign Up
</Link>

              <Link
                to={"/login"}
                className="w-full text-center border-2 border-[#15317E] text-[#15317E] py-2 rounded-md hover:bg-[#15317E] hover:text-white transition"
              >
                Login
              </Link>
            </>
          ) : (
            <button
  onClick={handleLogout}
  className="w-full text-center bg-[#15317E] text-white py-2 rounded-md border-2 border-transparent 
  hover:border-[#15317E] hover:text-[#15317E] hover:bg-[#ffffff] transition"
>
  Logout
</button>

          )}
        </div>

        <hr className="border-t-[#15317E] mb-4" />

        
        <ul className="flex flex-col gap-3 text-lg font-semibold text-gray-800">
          {isAuthenticated && (
            <li>
              <Link to={"/me"} className="flex items-center gap-3 hover:text-[#7D6115] transition">
                <FaUserCircle /> Profile
              </Link>
            </li>
          )}
          <li>
            <Link to={"/how-it-works-info"} className="flex items-center gap-3 hover:text-[#7D6115] transition">
              <SiGooglesearchconsole /> How it works
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="flex items-center gap-3 hover:text-[#7D6115] transition">
              <BsFillInfoSquareFill /> About Us
            </Link>
          </li>
        </ul>

        <div className="flex flex-col items-left mt-6 text-sm">
  <div className="flex  items-left gap-2">
    <Link to="/" className="text-gray-500 text-xl hover:text-blue-700">
      <FaFacebook />
    </Link>
    <Link to="/" className="text-gray-500 text-xl hover:text-pink-500">
      <RiInstagramFill />
    </Link>
  </div>

  <Link to={"/contact"} className="mt-2 text-[#15317E] font-semibold hover:text-[#7D6115] transition">
    Contact Us
  </Link>

  <p className="text-gray-500 mt-1 text-xs">&copy; AuctionEdge, LLC.</p>
  <p className="text-gray-500 text-xs">
    Designed By{" "}
    <Link to={"/"} className="font-semibold hover:text-[#7D6115] transition">
      AuctionEdge & Team
    </Link>
  </p>
</div>


       
        <IoMdCloseCircleOutline
          onClick={() => setShow(!show)}
          className="absolute top-4 right-4 text-3xl sm:hidden text-gray-500 hover:text-[#7D6115] cursor-pointer"
        />
      </div>
    </>
  );
};

export default SideDrawer;
