import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <>
      <nav className="fixed top-0 left-0 h-screen w-56 border-r-2 border-r-slate-300 bg-white">
        {/* <div className={`nav-container navbar-${props.mode} bg-${props.mode} text-{${props.mode} === "dark" ? "white" : "black" } flex flex-col h-screen w-56 border-2 border-r-slate-300`}> */}

        <div className="logo flex items-center gap-4 justify-evenly border-b-[#9F9A9A] border-2 h-14 w-screen bg-white	">
          <div className="flex">
            <img
              className="mx-auto h-10 w-auto"
              src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small/abstract-circle-logo-icon-free-png.png"
              alt="logo"
            />
            <Link className="navbar-brand flex items-center" to="/home">
              SkinMedia
            </Link>
          </div>

          <div className="bg-[#E4E4E4] w-1/4 h-8 flex items-center pl-2 rounded-xl text-gray-500 text-sm">
            <input
              className="bg-[#E4E4E4] outline-none w-full text-sm"
              type="text"
              placeholder="Search Here..."
            />
          </div>

          <div>
            <Link
              className="btn p-2 bg-blue-600 rounded-2xl text-white w-14 h-8 gap-4 mr-3"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="btn p-2 bg-gray-200 rounded-2xl text-gray-700 w-20 h-8"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div
          className={`flex flex-col pl-10 pt-16 gap-6 w-56 h-screen border-r-[#9F9A9A] border-2`}
        >
          <Link className="navbar-brand" to="/home">
            {" "}
            <i className="ri-home-4-line mr-2"></i>Home
          </Link>
          <Link className="navbar-brand" to="/popular">
            {" "}
            <i className="ri-search-line mr-2"></i>Popular
          </Link>
          <Link className="navbar-brand" to="/topics">
            {" "}
            <i className="ri-book-open-line mr-2"></i>Topics
          </Link>
          <Link className="navbar-brand" to="/qa">
            {" "}
            <i className="ri-notification-3-line mr-2"></i>Q/Ans
          </Link>
          <Link className="navbar-brand" to="/communities">
            {" "}
            <i className="ri-add-box-line mr-2"></i>Communities
          </Link>
          <Link className="navbar-brand" to="/profile">
            {" "}
            <i className="ri-user-line mr-2"></i>Profile
          </Link>
          <Link className="navbar-brand" to="/createPost">
            {" "}
            <i class="ri-add-circle-line mr-2"></i>Create Post
          </Link>

          {/* <Link className="navbar-brand" to="/profile"> <i className="ri-user-line mr-2"></i>Settings</Link>  */}
        </div>

        {/* <div className={`form-check form-switch`}>
                <input className="form-check-input" onClick = {props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label mx-2" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
            </div> */}
        {/* </div> */}
        {/* </div> */}
      </nav>
    </>
  );
};

export default Navbar;
