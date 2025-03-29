import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <article className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col items-center">
      <h1 className="text-[#d6482b] text-4xl font-bold mb-6 text-center">Create Auction</h1>
      <div className="bg-white w-full max-w-3xl px-8 py-6 shadow-xl rounded-xl">
        <form className="flex flex-col gap-6" onSubmit={handleCreateAuction}>
          <p className="font-semibold text-2xl">Auction Details</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
              <option value="">Select Category</option>
              {auctionCategories.map((element) => (
                <option key={element} value={element}>{element}</option>
              ))}
            </select>
          </div>

          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field" rows={4} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="input-field">
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
            <input type="number" placeholder="Starting Bid" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} className="input-field" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" className="input-field" />
            <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" className="input-field" />
          </div>

          <div className="border-2 border-dashed border-gray-400 p-6 rounded-md flex flex-col items-center">
            {imagePreview ? <img src={imagePreview} alt="Auction Item" className="w-32 h-32 object-cover" /> : <p className="text-gray-500">Upload Image</p>}
            <input type="file" className="" onChange={imageHandler} />
          </div>

          <button className="bg-[#D6482B] text-lg font-semibold py-3 rounded-md text-white w-full hover:bg-[#b8381e] transition">
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateAuction;