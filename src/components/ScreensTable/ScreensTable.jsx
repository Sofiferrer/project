import React from "react";
import { Link } from "react-router-dom";
import { Space, Table, Button, Popconfirm, Empty } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function ScreensTable({ onDelete, screens, loading }) {
  //La tabla recibe como props la callback para eliminar elementos, la lista de pantallas y el loading del store y renderiza las columnas y data proporcionadas, la logica la resuelve la vista padre.

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
      key: "resolution",
      responsive: ["md"],
      render: (_, screen) => (
        <Space size="middle">
          <span>{`${screen.resolution_height} x ${screen.resolution_width} px`}</span>
        </Space>
      ),
    },
    {
      title: "Price per day",
      dataIndex: "pricexday",
      key: "pricexday",
      responsive: ["md"],
      render: (_, screen) => (
        <Space size="middle">
          <span>{`$ ${screen.price_per_day}`}</span>
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (_, screen) => (
        <Space size="middle">
          <Popconfirm
            title={`Delete ${screen.name}`}
            description={`Are you sure to delete this screen?`}
            onConfirm={() => onDelete(screen.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger shape="circle" size="small">
              <DeleteOutlined />
            </Button>
          </Popconfirm>

          <Link to={`/latinAd-react/screen/${screen.id}`}>
            <EyeOutlined /> / <EditOutlined />
          </Link>
        </Space>
      ),
      align: "center",
    },
  ];
  const data = screens;
  return (
    <>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        loading={loading}
        sticky={true}
        tableLayout="fixed"
        pagination={false}
        locale={{ emptyText: <Empty /> }}
      />
    </>
  );
}
