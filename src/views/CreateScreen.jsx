import React from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { create } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ScreenForm from "../components/ScreenForm/ScreenForm";

export default function CreateScreen() {
  const dispatch = useDispatch();
  const token = useSelector(selectUser);
  const navigate = useNavigate();

  const createScreen = (values) => {
    dispatch(create({ data: values, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Data is missing", 1);
      } else {
        message.success("Created", 1);
        navigate("/latinAd-react/screens");
      }
    });
  };

  return (
    <>
      <h2 style={{ margin: "50px auto" }}>Create a new Screen</h2>
      <ScreenForm onSubmit={createScreen}></ScreenForm>
    </>
  );
}
