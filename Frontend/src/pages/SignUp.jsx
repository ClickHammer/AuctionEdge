import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    profileImage: null,
    bank: "",
    accountNumber: "",
    bankUserName: "",
    ifscCode: "",
    upiId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data: ", formData);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-[#15317E] text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Personal Details */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-[#00000080]">
              Personal Details
            </h2>
          </div>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
          />

          {/* Role & Password */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Role</option>
            <option value="bidder">Bidder</option>
            <option value="auctioneer">Auctioneer</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />

          {/* Profile Image Upload */}
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full"
            />
          </div>

          {/* Payment Method Details */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-[#00000080]">
              Payment Method Details
            </h2>
            <p className="text-sm text-gray-500">
              Fill payment details only if you are registering as an Auctioneer.
            </p>
          </div>

          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Your Bank</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="SBI">SBI Bank</option>
            <option value="ICICI">ICICI Bank</option>
          </select>
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="bankUserName"
            placeholder="Bank Account Username"
            value={formData.bankUserName}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="ifscCode"
            placeholder="IFSC Code"
            value={formData.ifscCode}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="upiId"
            placeholder="UPI ID"
            value={formData.upiId}
            onChange={handleChange}
            className="input-field"
          />

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-[#15317E] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#ffffff] hover:border-[#15317E] hover:text-[#15317E] transition duration-300 border-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
