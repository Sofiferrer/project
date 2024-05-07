import React from "react";
import { Pagination } from "antd";

export default function Paginator({ onSubmit, page, pageSize, totalScreens }) {
  return (
    <>
      <Pagination
        defaultCurrent={1}
        current={page}
        total={totalScreens}
        hideOnSinglePage={true}
        pageSize={pageSize}
        showSizeChanger={true}
        pageSizeOptions={[10, 20, 50]}
        onChange={onSubmit}
        onShowSizeChange={onSubmit}
      />
    </>
  );
}
