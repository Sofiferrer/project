import React from "react";
import { Link } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";

export default function AddBtn() {
  return (
    <Link
      to="/latinAd-react/create"
      className="add-btn"
      style={{
        height: "25px",
        backgroundColor: "#00b96b",
        borderRadius: "3px",
        display: "flex",
        alignItems: "center",
        padding: "3px 15px",
        color: "black",
      }}
    >
      <FileAddOutlined style={{ marginRight: "5px" }} />
      New
    </Link>
  );
}
