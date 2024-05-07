import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/authSlice";

export default function Home() {
  const token = useSelector(selectUser);

  return (
    <>
      <h2>Welcome to LatinAD</h2>
      <h3>Screens</h3>

      {token ? (
        <Link to="/latinAd-react/screens">Go to screens</Link>
      ) : (
        <Link to="/latinAd-react/login">Login to continue</Link>
      )}
    </>
  );
}
