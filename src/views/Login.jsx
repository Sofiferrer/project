import React from "react";
import { Button, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const { loading } = useSelector((state) => state.auth);

  const openNotification = (message) => {
    api.info({
      message: `${message}`,
      placement: "top",
      duration: 2.5,
      className: "error-notification",
    });
  };

  const onFinish = (values) => {
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
      <Form
        form={loginForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Insert a valid email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          type="password"
          rules={[
            {
              required: true,
              message: "Your password must be at least 4 char",
              min: 4,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
