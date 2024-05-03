import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
  const screensState = useSelector((state) => state.screens);
  console.log(screensState);
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
