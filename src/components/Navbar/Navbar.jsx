import React from "react";
import { Button } from "antd";
import { logout } from "../../features/auth/authSlice";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout()).then((result) => navigate("/"));
  };

  return (
    <div>
      Navbar
      <Button type="primary" size="large" onClick={logOut}>
        Logout
      </Button>
    </div>
  );
}
