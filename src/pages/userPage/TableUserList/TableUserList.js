import { Space, Table, Tag } from "antd";
import { headerTableUsers } from "../../../utils/userManagement.utils";

const TableUserList = ({ userList }) => (
  <Table
    columns={headerTableUsers}
    dataSource={userList}
    pagination={false}
    rowKey='_id'
  />
);

export default TableUserList;
