import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-60 border-r border-gray-200 bg-white shadow-md">
      <div className="flex flex-col h-full">
        {/* Logo and Search Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-100">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-auto"
              src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
              alt="logo"
            />
            <Link className="text-xl font-semibold text-gray-700" to="/home">
              SkinMedia
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col p-4 space-y-3">
          <Link
            className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md text-sm"
            to="/home"
          >
            <i className="ri-home-4-line text-lg mr-2"></i>
            Home
          </Link>
          <Link
            className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md text-sm"
            to="/topics"
          >
            <i className="ri-book-open-line text-lg mr-2"></i>
            Topics
          </Link>
          <Link
            className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md text-sm"
            to="/profile"
          >
            <i className="ri-user-line text-lg mr-2"></i>
            Profile
          </Link>
          <Link
            className="flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded-md text-sm"
            to="/createPost"
          >
            <i className="ri-add-circle-line text-lg mr-2"></i>
            Create Post
          </Link>

          <Link
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            to="/login"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
