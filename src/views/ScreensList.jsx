import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteScreen, getAll } from "../features/screens/screenSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Button, message } from "antd";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";
import Paginator from "../components/Paginator/Paginator";
import Filters from "../components/Filters/Filters";
import ScreensTable from "../components/ScreensTable/ScreensTable";
import AddBtn from "../components/AddBtn/AddBtn";

export default function ScreensList() {
  const dispatch = useDispatch();

  const token = useSelector(selectUser);
  const { loading } = useSelector((state) => state.screens);

  const [totalScreens, setTotalScreens] = useState(0);
  const [screens, setScreens] = useState([]);
  const [page, setPage] = useState(1);
  const [reset, setReset] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [queryParams, setQueryParams] = useSearchParams({
    name: "",
    type: "",
    pageSize: 10,
    offset: 0,
  });

  const searchParams = useMemo(() => {
    const name = queryParams.get("name") || "";
    const type = queryParams.get("type") || "";
    const pageSize = parseInt(queryParams.get("pageSize") || 10);
    const offset = parseInt(queryParams.get("offset") || 0);
    return {
      name,
      type,
      pageSize,
      offset,
    };
  }, [queryParams]);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, searchParams]);

  const handleFilters = (values) => {
    setQueryParams({
      name: values.name || "",
      type: values.type || "",
      pageSize: pageSize,
      offset: 0,
    });
    setPage(1);
    setReset(false);
  };

  const fetchData = () => {
    const params = new URLSearchParams({
      name: searchParams.name,
      type: searchParams.type,
      pageSize: searchParams.pageSize,
      offset: searchParams.offset,
    });

    dispatch(getAll({ params: params.toString(), token: token })).then(
      (result) => {
        setScreens(result.payload.data);
        setTotalScreens(result.payload.totalCount);
      }
    );
  };

  const handlePageChange = (pageNumber, itemsPerPage) => {
    setPage(pageNumber);
    setPageSize(itemsPerPage);
    const name = queryParams.get("name");
    const type = queryParams.get("type");
    setQueryParams({
      name: name || "",
      type: type || "",
      pageSize: itemsPerPage,
      offset: (pageNumber - 1) * itemsPerPage,
    });
  };

  const onReset = () => {
    setReset(true);
    setPage(1);
    setPageSize(10);

    setQueryParams({
      name: "",
      type: "",
      pageSize: 10,
      offset: 0,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteScreen({ id: id, token: token })).then((result) => {
      if (typeof result.payload == "string") {
        message.error("Something went wrong, try again", 1);
      } else {
        message.success("Deleted", 1);
        onReset();
      }
    });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Filters
          onSubmit={handleFilters}
          params={queryParams}
          reset={reset}
          loading={loading}
        ></Filters>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <AddBtn></AddBtn>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <main>
          {totalScreens > 0 ? (
            <ScreensTable
              screens={screens}
              loading={loading}
              onDelete={handleDelete}
            ></ScreensTable>
          ) : (
            <p>No screens match the filter</p>
          )}
          <p style={{ width: "100%", textAlign: "left" }}>
            Total screens: {totalScreens}
          </p>
          <Paginator
            onSubmit={handlePageChange}
            page={page}
            pageSize={pageSize}
            totalScreens={totalScreens}
          ></Paginator>
        </main>
      )}
    </>
  );
}
