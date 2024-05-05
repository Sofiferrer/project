import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAll } from "../features/screens/screenSlice";
import { Pagination, Form, Input, Radio, Button } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";

export default function ScreensList() {
  const dispatch = useDispatch();

  const token = useSelector(selectUser);
  const { loading } = useSelector((state) => state.screens);

  const [filterForm] = Form.useForm();

  const [totalScreens, setTotalScreens] = useState(0);
  const [screens, setScreens] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [params, setParams] = useState({
    name: "",
    type: "",
    pageSize: 10,
    offset: 0,
  });

  useEffect(() => {
    filterForm.setFieldsValue({
      name: "",
      type: "",
    });
  }, []);

  useEffect(() => {
    fetchData(params, page);
  }, [page, pageSize]);

  const handleFormSubmit = (values) => {
    setParams({ name: values.name, type: values.type });
    setPage(1);
    fetchData(values, 1);
  };

  const fetchData = (values, page) => {
    const searchParams = new URLSearchParams({
      name: values.name || "",
      type: values.type || "",
      pageSize,
      offset: (page - 1) * pageSize,
    });
    dispatch(getAll({ params: searchParams, token: token })).then((result) => {
      setScreens(result.payload.data);
      setTotalScreens(result.payload.totalCount);
    });
  };

  const handlePageChange = (pageNumber, itemsPerPage) => {
    setPage(pageNumber);
    setPageSize(itemsPerPage);
  };

  const onReset = () => {
    filterForm.resetFields();
    setPage(1);
    setParams({
      name: "",
      type: "",
      pageSize: 10,
      offset: 0,
    });
    fetchData(
      {
        name: "",
        type: "",
        pageSize: 10,
        offset: 0,
      },
      1
    );
  };

  return (
    <>
      <Navbar />

      <Link to="/create"> Add Screen</Link>
      <Form
        form={filterForm}
        name="filter-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Radio.Group>
            <Radio
              value="indoor"
              onChange={(e) =>
                handleFormSubmit({ ...params, type: e.target.value })
              }
            >
              {" "}
              Indoor{" "}
            </Radio>
            <Radio
              value="outdoor"
              onChange={(e) =>
                handleFormSubmit({ ...params, type: e.target.value })
              }
            >
              {" "}
              Outdoor{" "}
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Search
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <main>
          {" "}
          {totalScreens > 0 ? (
            <ul>
              {screens?.map((screen) => {
                return (
                  <li key={screen.id}>
                    <Link to={`/screen/${screen.id}`}>{screen.name}</Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No screens match the filter</p>
          )}
          <Pagination
            defaultCurrent={1}
            current={page}
            total={totalScreens}
            hideOnSinglePage={true}
            showSizeChanger={true}
            pageSizeOptions={[10, 20, 50]}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </main>
      )}
    </>
  );
}
