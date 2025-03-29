import { login } from "@/store/slices/UserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
      <section className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg px-8 py-6 sm:w-[450px]">
          {}
          <h1 className="text-[#15317E] text-center text-4xl font-bold mb-6">Login</h1>

          {}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              />
            </div>

            {}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#15317E] focus:ring-[#15317E] focus:ring-1 outline-none transition duration-200"
              />
            </div>

            {}
            <button
              className="bg-[#15317E] text-white font-semibold text-lg py-3 rounded-md hover:bg-white hover:text-[#15317E] hover:border-[#15317E] border transition-all duration-300"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-[#15317E] font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
