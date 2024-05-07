import React from "react";
import { Link } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";

import "./AddBtn.css";

export default function AddBtn() {
  return (
    <Link to="/latinAd-react/create" className="add-btn">
      <FileAddOutlined />
      New
    </Link>
  );
}
