import { Tag } from 'antd';
import { ActionItem } from '../pages/userPage/ActionItem/ActionItem';

export const headerTableUsers = [
  {
    title: 'Họ tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Gmail',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <span className='text-blue-600'>{text}</span>,
  },
  {
    title: 'Loại tài khoản',
    dataIndex: 'role',
    key: 'role',
    render: (text) => {
      if (text === 'CLIENT') {
        return <Tag color={'#87d068'}>CLIENT</Tag>;
      } else {
        return <Tag color={'#f50'}>ADMIN</Tag>;
      }
    },
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    key: 'action',
    render: (actionObject, record) => {
      return (
        <ActionItem record={record} />
      );
    },
  },
];

