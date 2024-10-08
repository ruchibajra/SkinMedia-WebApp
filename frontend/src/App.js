import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Popular from "./components/Popular/Popular";
import HomeCard from "./components/Home/HomeCard";
import CategoryIntegration from "./components/Category/Category";
import CreatePost from "./components/CreatePost/CreatePost";
import Profile from "./components/Profile/Profile";
import FullPost from "./components/FullPost/FullPost";
import AdminPage from "./components/AdminPage/AdminPage";

function App() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {!["/", "/signup", "/login"].includes(location.pathname) && (
        <Navbar onSearch={(query) => setSearchQuery(query)} />)}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/post" element={<FullPost />} />
        <Route path="/home" element={<HomeCard searchQuery={searchQuery} />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/topics" element={<CategoryIntegration />} />
        <Route path="/qa" element={<Popular />} />
        <Route path="/communities" element={<Popular />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
