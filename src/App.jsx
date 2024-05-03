import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const screensState = useSelector((state) => state.screens);
  console.log(screensState);
  return (
    <>
      <p>latinAd</p>
    </>
  );
}

export default App;
