import React from "react";
import { Button, Menu } from "antd";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout()).then((result) => navigate("/latinAd-react/"));
  };

  return (
    <div className="navbar">
      <h2>LatinAD</h2>
      <Button type="primary" size="large" onClick={logOut}>
        Logout
      </Button>
    </div>
    // <div>
    //   Navbar

    // </div>
  );
}
