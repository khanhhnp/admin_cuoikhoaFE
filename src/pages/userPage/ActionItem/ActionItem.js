import { useDispatch } from 'react-redux';
import {
  DELETE_USER,
  GET_DETAIL_USER,
} from '../../../constants/globalVariable';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export const ActionItem = ({ record }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div id='user-action-item'>
        <Link to={`/user/${record._id}`}>
          <Button
            onClick={() => {
              dispatch({ type: GET_DETAIL_USER, payload: record._id });
            }}
            type='primary'
          >
            Sửa
          </Button>
        </Link>
        <Link to={`/`}>
          <Button
            onClick={() => {
              dispatch({ type: DELETE_USER, payload: record._id });
            }}
            type='primary'
            danger
          >
            Xoá
          </Button>
        </Link>
      </div>
    </>
  );
};
