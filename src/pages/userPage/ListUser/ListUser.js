import { Pagination } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableUserList from "../TableUserList/TableUserList";

export const ListUser = () => {
  const [page, setPage] = useState(0);

  const { listUser } = useSelector((state) => state.listUserReducer);
  return (
    <div>
      <section className='text-gray-600 body-font'>
        <div className='container py-14 mx-auto'>
          
          <TableUserList userList={listUser[page]} />
          <div
            id='pagination-user-work'
            className='flex justify-center items-center mt-10'
          >
            <Pagination
              onChange={(value) => setPage(value - 1)}
              showSizeChanger={false}
              defaultCurrent={1}
              pageSize={1}
              total={listUser.length}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
