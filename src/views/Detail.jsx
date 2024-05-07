import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteScreen, getById } from "../features/screens/screenSlice";
import { Button, Popconfirm, message } from "antd";
import { update } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import ScreenForm from "../components/ScreenForm/ScreenForm";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Detail() {
  const { id } = useParams();

  const [screen, setScreen] = useState({});
  const token = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById({ id: id, token: token })).then((result) => {
      setScreen(result.payload);
    });
  }, []);

  const handleUpdate = (values) => {
    dispatch(update({ id: id, data: values, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Updated", 1);
        navigate("/latinAd-react/screens");
      }
    });
  };

  const handleDelete = () => {
    dispatch(deleteScreen({ id: id, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Deleted", 1);
        navigate("/latinAd-react/screens");
      }
    });
  };

  return (
    <div>
      <div
        style={{
          width: "60%",
          margin: "30px auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/latinAd-react/screens"
          style={{
            display: "block",
            width: "35px",
            height: "35px",
            backgroundColor: "#1b8b5d",
            color: "black",
          }}
        >
          <RollbackOutlined />
        </Link>
        <Popconfirm
          title={`Delete ${screen.name}`}
          description={`Are you sure to delete this screen?`}
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </div>

      <ScreenForm onSubmit={handleUpdate} initialValues={screen}></ScreenForm>
    </div>
  );
}
