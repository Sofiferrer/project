import React, { useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";

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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={{ name: nameInitialValue, type: typeInitialValue }}
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="type">
        <Radio.Group>
          <Radio value="indoor"> Indoor </Radio>
          <Radio value="outdoor"> Outdoor </Radio>
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
