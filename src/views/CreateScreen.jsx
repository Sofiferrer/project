import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Radio } from "antd";
import { useDispatch } from "react-redux";
import { create } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function CreateScreen() {
  const dispatch = useDispatch();
  const [createForm] = Form.useForm();
  const token = useSelector(selectUser);
  const { loading } = useSelector((state) => state.screens);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(create({ data: values, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        console.log(result);
        message.error("Data is missing", 1);
      } else {
        console.log(result);
        message.success("Created", 1);
        navigate("/screens");
      }
    });
  };

  return (
    <>
      <Form
        form={createForm}
        name="create"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Insert name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="description"
          name="description"
          rules={[
            {
              required: true,
              max: 50,
              message: "Add a short description",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Price x day"
          name="price_per_day"
          rules={[
            {
              required: true,
              message: "Insert price",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Heigh"
          name="resolution_height"
          rules={[
            {
              required: true,
              message: "Insert heigh",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Width"
          name="resolution_width"
          rules={[
            {
              required: true,
              message: "Insert width",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Choose a type",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="indoor"> Indoor </Radio>
            <Radio value="outdoor"> Outdoor </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
        <Link to="/screens">Back to list</Link>
      </Form>
    </>
  );
}
