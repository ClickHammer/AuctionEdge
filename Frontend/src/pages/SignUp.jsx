import { register } from "@/store/slices/UserSlice"; 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountHolderName, setbankAccountHolderName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [upiId, setupiId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountHolderName", bankAccountHolderName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("ifscCode", ifscCode);
      formData.append("upiId", upiId);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Sign Up</h2>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleRegister}>
            <input type="text" placeholder="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
            <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded col-span-1 focus:border-blue-900 focus:outline-none" required>
              <option value="">Select Role</option>
              <option value="Auctioneer">Auctioneer</option>
              <option value="Bidder">Bidder</option>
            </select>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
            
            <div className="col-span-2 border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
              <label className="cursor-pointer">
                <span className="block mb-2 text-gray-700">Upload Profile Image</span>
                <input type="file" onChange={imageHandler} className="hidden" />
                <div className="bg-gray-200 p-2 rounded-lg">Choose File</div>
              </label>
            </div>

            {profileImagePreview && <img src={profileImagePreview} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full mx-auto col-span-2" />} 
            {role === "Auctioneer" && (
              <>
                <input type="text" placeholder="Bank Account Holder Name" value={bankAccountHolderName} onChange={(e) => setbankAccountHolderName(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
                <input type="text" placeholder="Bank Account Number" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
                <input type="text" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
                <input type="text" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setifscCode(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none" required />
                <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setupiId(e.target.value)} className="p-2 border rounded placeholder-black focus:border-blue-900 focus:outline-none col-span-1" required />
              </>
            )}
            <button type="submit" className="bg-blue-900 text-white py-2 rounded col-span-2" disabled={loading}>{loading ? "Registering..." : "Sign Up"}</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
