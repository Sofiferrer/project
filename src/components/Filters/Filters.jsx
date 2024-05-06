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
        margin: "auto 30px",
      }}
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={{ name: nameInitialValue, type: typeInitialValue }}
    >
      <Form.Item name="name" style={{ marginRight: "20px" }}>
        <Input
          prefix={<SearchOutlined className="site-form-item-icon" />}
          placeholder="Filter by name"
        />
      </Form.Item>

      <Form.Item name="type">
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}
