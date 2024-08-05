import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(userData);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; //destructuring
    setUserData({
      ...userData, //spread operator (copy)
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
    e.preventDefault(); //data wont disapper untill form submitted
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          //axios handles request and response
          "http://localhost:5000/api/auth/register",
          {
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
          }
          //   these keys must be matched with database/backend keys like name email password
          // if image not added then send data directly else use form data
        );
        console.log(response);
        console.log("successful?")
        toast.success("Registration successful");

        // navigate to login page
        // setTimeout(() => {
        //   navigate("/login");
        // }, 2000);
      } catch (error) {
        console.error(error.message);
        toast.error(error.response.data.msg);
        // toast is like alert
      }
    } else {
      console.log("Validation Errors:", validationErrors);
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
      <div className="flex  justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col h-4/5 w-1/3  items-center	">
          <h1 className="font-sans text-3xl font-bold	">
            Create a new account!
          </h1>
          <span>Or</span>
          <a href="/login" className="text-blue-600">
            Login
          </a>

          <div className="my-6 mx-10 flex flex-col bg-white  w-11/12 mt-5 rounded-md shadow-md">
            <form onSubmit={handleSubmit}>
              <ToastContainer />

              <div>
                <label htmlFor="" className="text-sm font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="border-2 py-2 px-3 text-sm mb-4 rounded"
                  placeholder="Enter username"
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm">{errors.username}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="userName"
                  className="text-sm font-semibold mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  className="border-2 py-2 px-3 text-sm mb-4 rounded"
                  placeholder="Enter your phone number "
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="text-red-500 text-sm">{errors.phone}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="text"
                  className="border-2 py-2 px-3 text-sm mb-4 rounded"
                  placeholder="user@example.com"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold mb-1"
                >
                  Password
                </label>
                <input
                  className="border-2 py-2 px-3 text-sm mb-4 rounded"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="text-gray-500 cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="text-gray-500 cursor-pointer" />
                  )}
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold mb-1"
                >
                  Confirm Password
                </label>
                <input
                  className="border-2 py-2 px-3 text-sm mb-4 rounded"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEye className="text-gray-500 cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="text-gray-500 cursor-pointer" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                className="bg-blue-700 my-2 py-2 text-white rounded-md text-sm font-semibold"
                type="submit"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
