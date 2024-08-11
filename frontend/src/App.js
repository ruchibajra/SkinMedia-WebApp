import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
// import Home from "./components/Home/Home";
import Popular from "./components/Popular/Popular";
import HomeDataComponent from "./components/Home/HomeDataComponent";
import CategoryIntegration from "./components/Category/Category";
import CreatePost from "./components/CreatePost/CreatePost";
import Profile from "./components/Profile/Profile";
import FullPost from "./components/FullPost/FullPost";
import UpdatePostModal from "./components/UpdatePostModal/UpdatePostModal";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeDataComponent />} />
            <Route path="/post" element={<FullPost />} />
            <Route path="/home" element={<HomeDataComponent />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/topics" element={<CategoryIntegration />}  />
            <Route path="/qa" element={<Popular />} />
            <Route path="/communities" element={<Popular />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
