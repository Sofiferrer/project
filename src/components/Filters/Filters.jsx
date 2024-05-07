import React, { useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Filters({ onSubmit, params, reset, loading }) {
  const [filterForm] = Form.useForm();
  const typeInitialValue = params.get("type").toString();
  const nameInitialValue = params.get("name").toString();

  useEffect(() => {
    filterForm.setFieldsValue({
      name: nameInitialValue,
      type: typeInitialValue,
    });
  }, []);

  useEffect(() => {
    resetForm();
  }, [reset]);

  const resetForm = () => {
    if (reset) {
      filterForm.resetFields();
      filterForm.setFieldsValue({
        name: "",
        type: "",
      });
    }
  };

  return (
    <Form
      form={filterForm}
      name="filter-form"
      style={{
        maxWidth: 500,
        display: "flex",
        justifyContent: "space-between",
      }}
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={{ name: nameInitialValue, type: typeInitialValue }}
    >
      <Form.Item name="name" style={{ margin: "0 20px 0 0" }}>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          placeholder="Filter by name"
        />
      </Form.Item>

      <Form.Item name="type" style={{ margin: "0" }}>
        <Radio.Group style={{ display: "flex" }}>
          <Radio value="indoor" style={{ color: "beige" }}>
            {" "}
            Indoor{" "}
          </Radio>
          <Radio value="outdoor" style={{ color: "beige" }}>
            {" "}
            Outdoor{" "}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item style={{ margin: "0" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}
