import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

export default function Home() {
  const token = useSelector(selectUser);

  return (
    <>
      <h1>Welcome to LatinAD</h1>
      <h3>Screens</h3>

      {token ? (
        <Link to="/latinAd-react/screens">Go to screens</Link>
      ) : (
        <Link to="/latinAd-react/login">Login to continue</Link>
      )}
    </>
  );
}
