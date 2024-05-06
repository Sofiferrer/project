import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form, Input, InputNumber, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import "./ScreenForm.css";

export default function ScreenForm({ onSubmit, initialValues }) {
  const [screenForm] = Form.useForm();
  const { loading } = useSelector((state) => state.screens);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      console.log(initialValues);
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
      style={{ maxWidth: 600, margin: "auto" }}
      onFinish={onSubmit}
      autoComplete="off"
      layout="vertical"
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
        label="Description"
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
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          <div className="input-group">
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
          </div>
          <div className="input-group">
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
          </div>
        </div>
        {initialValues ? (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <img
              alt="screen picture"
              src={`${initialValues.picture_url}`}
              style={{ width: "auto", height: "25vh" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Form.Item label="Picture" disabled>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                disabled
              >
                <UploadOutlined />
              </Upload>
            </Form.Item>
          </div>
        )}
      </div>
      <Form.Item style={{ marginTop: "30px" }}>
        <Button
          size="large"
          type="secondary"
          htmlType="button"
          loading={loading}
          onClick={() => navigate("/latinAd-react/screens")}
        >
          Cancel
        </Button>
        <Button size="large" type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Save" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
}
