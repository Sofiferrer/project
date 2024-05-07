import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { login } from "../redux/auth/authSlice";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [reset, setReset] = useState(false);

  const openNotification = (message) => {
    api.info({
      message: `${message}`,
      placement: "top",
      duration: 2.5,
      className: "error-notification",
    });
  };

  const handleLogin = (values) => {
    const data = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    dispatch(login(data)).then((result) => {
      if (result.payload.token) {
        setReset(true);
        navigate("/latinAd-react/screens");
      } else {
        setReset(true);
        openNotification("Invalid credentials, try again");
      }
    });
  };

  return (
    <>
      {contextHolder}
      <h2>Login</h2>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        reset={reset}
      ></LoginForm>
    </>
  );
}
