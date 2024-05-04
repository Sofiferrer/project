import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAll } from "../features/screens/screenSlice";
import { logout } from "../features/auth/authSlice";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import Loader from "../components/Loader/Loader";

export default function ScreensList() {
  const [screens, setScreens] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectUser);
  const { loading } = useSelector((state) => state.screens);

  const data = {
    pageSize: "10",
    offset: "0",
    name: "",
    type: "",
  };

  const searchParams = new URLSearchParams(data);
  useEffect(() => {
    dispatch(getAll({ params: searchParams, token: token })).then((result) =>
      setScreens(result.payload.data)
    );
  }, []);

  const goToAdd = (id) => {
    navigate("/create");
  };

  const logOut = () => {
    dispatch(logout()).then((result) => console.log("logout", result));
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={goToAdd}>
        Add Screen
      </Button>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {screens?.map((screen) => {
            return (
              <li key={screen.id}>
                <Link to={`/screen/${screen.id}`}>{screen.name}</Link>
              </li>
            );
          })}
        </ul>
      )}

      <Button type="primary" size="large" onClick={logOut}>
        Logout
      </Button>
    </div>
  );
}
