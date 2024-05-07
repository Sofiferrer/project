import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./LoginForm.css";

export default function LoginForm({ onSubmit, loading, reset }) {
  const [loginForm] = Form.useForm();

  useEffect(() => {
    resetForm();
  }, [reset]);

  const resetForm = () => {
    if (reset) {
      loginForm.resetFields();
      loginForm.setFieldsValue({
        email: "",
        password: "",
      });
    }
  };

  return (
    <Form
      form={loginForm}
      name="basic"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete="off"
      className="login-form"
      layout="vertical"
    >
      <Form.Item
        className="form-item"
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
        className="form-item"
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

      <Form.Item className="form-item">
        <Button
          className="login-btn"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
