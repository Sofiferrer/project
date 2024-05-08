import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import { logout } from "../../redux/auth/authSlice";

export default function Navbar() {
  //Navbar ejecuta el logout
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout()).then((result) => navigate("/project/"));
  };

  return (
    <Flex align="center" justify="space-between">
      <h1>LatinAD</h1>
      <Button type="primary" size="large" onClick={logOut}>
        Logout
      </Button>
    </Flex>
  );
}
