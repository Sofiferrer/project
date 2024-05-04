import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { useDispatch } from "react-redux";
import { create } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

export default function CreateScreen() {
  const dispatch = useDispatch();
  const [createForm] = Form.useForm();
  const token = useSelector(selectUser);
  const { loading } = useSelector((state) => state.screens);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(create({ data: values, token: token })).then((result) => {
      console.log(result);
      navigate("/screens");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Insert name",
              type: "text",
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
              max: 50,
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
          <Input />
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
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item label="Price x day" name="type">
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
      </Form>
    </>
  );
}
