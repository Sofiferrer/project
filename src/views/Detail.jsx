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

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [screen, setScreen] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [editable, setEditable] = useState(false);
  const token = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getById({ id: id, token: token })).then((result) => {
      setInitialValues({
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

  const updateScreen = (values) => {
    dispatch(update({ id: id, data: values, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Updated", 1);
        navigate("/screens");
      }
    });
  };

  const confirmDelete = (e) => {
    dispatch(deleteScreen({ id: id, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Deleted", 1);
        navigate("/screens");
      }
    });
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
        description={`Are you sure to delete this screen?`}
        onConfirm={confirmDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      <Link to="/screens">Back to list</Link>
      <ScreenForm
        onSubmit={updateScreen}
        initialValues={initialValues}
        disabled={!editable}
      ></ScreenForm>
    </div>
  );
}
