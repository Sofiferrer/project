import React, { useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Radio } from "antd";
import { useSelector } from "react-redux";

export default function ScreenForm({ onSubmit, initialValues, disabled }) {
  const [screenForm] = Form.useForm();
  const { loading } = useSelector((state) => state.screens);

  useEffect(() => {
    if (initialValues) {
      screenForm.setFieldsValue({
        name: initialValues.name,
        description: initialValues.description,
        price_per_day: initialValues.price_per_day,
        resolution_height: initialValues.resolution_height,
        resolution_width: initialValues.resolution_width,
        type: initialValues.type,
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={screenForm}
      name="screen-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onSubmit}
      autoComplete="off"
      disabled={disabled}
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
          {initialValues ? "Save" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
}
