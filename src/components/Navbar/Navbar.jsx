import React from "react";
import { Button } from "antd";
import { logout } from "../../features/auth/authSlice";
import "./Navbar.css";

export default function Navbar() {
  const logOut = () => {
    dispatch(logout()).then((result) => console.log("logout", result));
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
