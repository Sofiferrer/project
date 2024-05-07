import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Flex, Form, Input, InputNumber, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LoadingImg from "../../assets/image/loadingImg.jpg";

export default function ScreenForm({ onSubmit, initialValues }) {
  //Formulario de creacion y edicion de pantallas, recibe por props la callback y los valores iniciales en caso de ser una pantalla a editar
  const [screenForm] = Form.useForm();
  const { loading } = useSelector((state) => state.screens);
  const navigate = useNavigate();

  //En caso de haber valores iniciales se setean en el formulario
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
      <Flex align="center">
        <div style={{ width: "60%" }}>
          <Flex align="center" justify="space-between">
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
          </Flex>
          <Flex align="center" justify="space-between">
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
          </Flex>
        </div>
        {initialValues ? (
          loading ? (
            <Flex
              justify="end"
              style={{
                width: "40%",
              }}
            >
              <img
                alt="loading picture"
                src={LoadingImg}
                style={{ width: "90%", height: "auto" }}
              />
            </Flex>
          ) : (
            <Flex
              justify="end"
              style={{
                width: "40%",
              }}
            >
              <img
                alt="screen picture"
                src={`${initialValues.picture_url}`}
                style={{ width: "90%", height: "auto" }}
              />
            </Flex>
          )
        ) : (
          <Flex
            align="center"
            justify="end"
            style={{
              width: "40%",
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
          </Flex>
        )}
      </Flex>
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
