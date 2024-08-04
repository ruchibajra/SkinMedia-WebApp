import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";


// import { useState } from "react";

function App() {
  // const [mode, setMode] = useState(`light`);

  // const toggleMode = () => {
  //   if (mode === "light") {
  //     setMode("dark");
  //     document.body.style.backgroundColor = "#042743";
  //     document.body.style.color="white"
  //   } else {
  //     setMode("light");
  //     document.body.style.backgroundColor = "white";
  //     document.body.style.color="#042743"
  //   }
  // };

  return (
    <>
      <Router>
        <div className="flex">
          <Navbar/> 
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/signup" element={<Registration />}/>
            <Route path="/login" element={<Login />}/>

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
