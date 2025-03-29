import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 w-80 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover transition-all duration-300 hover:scale-105 rounded-md"
        />
        <div className="mt-3">
          <h5 className="text-lg font-semibold text-gray-800 mb-2">{title}</h5>
          {startingBid && (
            <p className="text-gray-600">
              Starting Bid: <span className="text-blue-500 font-semibold">{startingBid}</span>
            </p>
          )}
          <p className="text-gray-600 text-sm">
            {timeLeft.type} {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
          <div className="flex flex-col gap-2 mt-3">
            <Link
              to={`/auction/details/${id}`}
              className="bg-blue-500 text-white text-sm px-3 py-2 rounded-md text-center transition-all duration-300 hover:bg-blue-700
              hover:text-white"
            >
              View Auction
            </Link>
            <button
              onClick={handleDeleteAuction}
              className="bg-red-400 text-white text-sm px-3 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
            >
              Delete Auction
            </button>
            <button
              onClick={() => setOpenDrawer(true)}
              className="bg-gray-300 text-gray-800 text-sm px-3 py-2 rounded-md transition-all duration-300 hover:bg-gray-500 hover:text-white"
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepublishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-all duration-500 ${
        openDrawer && id ? "translate-x-0" : "translate-x-full"
      } flex flex-col p-5`}
    >
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-xl font-semibold text-gray-800">Republish Auction</h3>
        <button
          onClick={() => setOpenDrawer(false)}
          className="text-gray-500 hover:text-red-500 transition-all"
        >
          ✕
        </button>
      </div>
      <form className="flex flex-col gap-4 my-4">
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm">Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat={"MMMM d, yyyy h:mm aa"}
            className="text-sm py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none w-full px-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm">End Time</label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat={"MMMM d, yyyy h:mm aa"}
            className="text-sm py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none w-full px-3"
          />
        </div>
        <button
          type="button"
          className="bg-blue-600 text-white text-sm py-2 rounded-md transition-all duration-300 hover:bg-blue-800"
          onClick={handleRepublishAuction}
        >
          {loading ? "Republishing..." : "Republish"}
        </button>
      </form>
    </section>
  );
};