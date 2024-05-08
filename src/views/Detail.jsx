import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Popconfirm, message } from "antd";
import { RollbackOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteScreen, getById, update } from "../redux/screens/screenSlice";
import { selectUser } from "../redux/auth/authSlice";
import ScreenForm from "../components/ScreenForm/ScreenForm";

export default function Detail() {
  //La vista toma el id de la url y el token del auth store y dispara la funcion getById, luego contiene funciones de update y delete
  const { id } = useParams();

  const token = useSelector(selectUser);
  const [screen, setScreen] = useState({});

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
        navigate("/project/screens");
      }
    });
  };

  const handleDelete = () => {
    dispatch(deleteScreen({ id: id, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Deleted", 1);
        navigate("/project/screens");
      }
    });
  };

  return (
    <>
      <Flex
        justify="space-between"
        style={{
          width: "60%",
          margin: "30px auto",
        }}
      >
        <Link
          to="/project/screens"
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
      </Flex>

      <ScreenForm onSubmit={handleUpdate} initialValues={screen}></ScreenForm>
    </>
  );
}
