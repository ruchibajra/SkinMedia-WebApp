import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Popular from "./components/Popular/Popular";
import HomeDataComponent from "./components/Home/HomeDataComponent";
import Post from "./components/Post/Post";

function App() {
  return (
    <>
      <Router>
        <div className="flex">
          <Navbar />
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/post" element={<Post />} />
            <Route path="/home" element={<HomeDataComponent />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/topics" element={<Popular />} />
            <Route path="/qa" element={<Popular />} />
            <Route path="/communities" element={<Popular />} />
            <Route path="/profile" element={<Popular />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
