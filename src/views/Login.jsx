import React from "react";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const openNotification = (message) => {
    api.info({
      message: `${message}`,
      placement: "top",
      duration: 2.5,
      className: "error-notification",
    });
  };

  const handleLogin = (values) => {
    dispatch(login(values)).then((result) => {
      if (result.payload.token) {
        loginForm.resetFields();
        navigate("/latinAd-react/screens");
      } else {
        loginForm.resetFields();
        openNotification("Invalid credentials, try again");
      }
    });
  };

  return (
    <>
      {contextHolder}
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} loading={loading}></LoginForm>
    </>
  );
}
