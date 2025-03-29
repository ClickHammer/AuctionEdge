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
  const [bankAccountHolderName, setBankAccountHolderName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");
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
  }, [isAuthenticated, navigateTo]);

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
    <section className="w-full h-fit px-5 pt-20 flex flex-col min-h-screen justify-center">
      <div className="bg-white max-w-lg mx-auto p-6 rounded-md shadow-md">
        <h1 className="text-[#d6482b] text-4xl font-bold text-center mb-4">Register</h1>
        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
          <p className="font-semibold text-xl text-center">Personal Details</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value="">Select Role</option>
              <option value="Auctioneer">Auctioneer</option>
              <option value="Bidder">Bidder</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="flex flex-col gap-2 items-center">
            <label className="text-[16px] font-semibold">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="profileImagePreview"
                className="w-14 h-14 rounded-full object-cover"
              />
              <input type="file" onChange={imageHandler} />
            </div>
          </div>

          {role === "Auctioneer" && (
            <>
              <p className="font-semibold text-xl text-center">
                Payment Method Details
                <span className="text-[12px] text-stone-500 block">
                  (Fill only if registering as an Auctioneer)
                </span>
              </p>

              <div className="flex flex-col gap-2">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Your Bank</option>
                  <option value="Indian Bank">Indian Bank</option>
                  <option value="State Bank Of India">State Bank Of India</option>
                  <option value="Bank Of Baroda">Bank Of Baroda</option>
                  <option value="Union Bank Of India">Union Bank Of India</option>
                </select>
                <input
                  type="text"
                  placeholder="Account Number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={bankAccountHolderName}
                  onChange={(e) => setBankAccountHolderName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="IFSC Code"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="UPI Id"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="input-field"
                />
              </div>
            </>
          )}

          <button
            className="bg-[#d6482b] w-full font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
