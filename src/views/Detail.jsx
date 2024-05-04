import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteScreen, getById } from "../features/screens/screenSlice";
import { Button, Form, Input, Radio, Popconfirm, message } from "antd";
import { update } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [screen, setScreen] = useState({});
  const [editable, setEditable] = useState(false);
  const [updateForm] = Form.useForm();
  const token = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getById({ id: id, token: token })).then((result) => {
      updateForm.setFieldsValue({
        name: result.payload.name,
        description: result.payload.description,
        price_per_day: result.payload.price_per_day,
        resolution_height: result.payload.resolution_height,
        resolution_width: result.payload.resolution_width,
        type: result.payload.type,
      });
      setScreen(result.payload);
    });
  }, []);

  const onFinish = (values) => {
    console.log("updatedScreen", values);
    const updatedScreen = {
      id: id,
      body: values,
    };
    dispatch(update({ id: id, data: values, token: token })).then((result) => {
      console.log(result);
      navigate("/screens");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const confirmDelete = (e) => {
    dispatch(deleteScreen({ id: id, token: token })).then((result) => {
      message.success("Deleted", result);
      navigate("/screens");
    });
  };
  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={() => setEditable(!editable)}
      >
        Edit Screen
      </Button>
      <Popconfirm
        title={`Delete ${screen.name}`}
        description="Are you sure to delete this screen?"
        onConfirm={confirmDelete}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Form
        form={updateForm}
        name="update"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          name: screen.name,
          description: screen.description,
          price_per_day: screen.price_per_day,
          resolution_height: screen.resolution_height,
          resolution_width: screen.resolution_width,
          type: screen.type,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        disabled={!editable}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
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
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
