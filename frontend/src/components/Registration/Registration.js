import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!userData.username) errors.username = "Username is required";
    if (!userData.phone) errors.phone = "Phone is required";
    if (!userData.email) errors.email = "Email is required";
    if (!userData.password) errors.password = "Password is required";
    if (!userData.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    if (userData.password !== userData.confirmPassword)
      errors.confirmPassword = "Passwords must match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
          }
        );
        toast.success("Registration successful");
        // Uncomment to navigate afte r successful registration
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
      } catch (error) {
        console.error(error.message);
        toast.error(error.response?.data?.msg || "Registration failed");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col h-auto w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold flex justify-center mb-4">Create a New Account</h1>
          <span className="text-center text-gray-600 mb-4">Or</span>
          <a href="/login" className="text-blue-600 text-center block mb-6">
            Login
          </a>

          <form onSubmit={handleSubmit}>
            <ToastContainer />

            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full border-2 py-2 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">
                Phone
              </label>
              <input
                type="text"
                className="w-full border-2 py-2 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border-2 py-2 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user@example.com"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            

            <div className="relative mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                className="w-full border-2 py-2 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </div>
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="relative mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
                Confirm Password
              </label>
              <input
                className="w-full border-2 py-2 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer mt-2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-gray-500" />
                ) : (
                  <FaEyeSlash className="text-gray-500" />
                )}
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              className="w-full bg-blue-700 py-2 text-white rounded-md text-sm font-semibold hover:bg-blue-800 transition"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
