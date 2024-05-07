import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { create } from "../redux/screens/screenSlice";
import { selectUser } from "../redux/auth/authSlice";
import { message } from "antd";
import ScreenForm from "../components/ScreenForm/ScreenForm";

export default function CreateScreen() {
  //La vista toma el token del estado del usuario en auth y lo pasa como argumento a la funcion de create
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
