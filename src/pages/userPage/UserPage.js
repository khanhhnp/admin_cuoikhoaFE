import React, { useEffect } from 'react';
import { ListUser } from './ListUser/ListUser';
import { useDispatch } from 'react-redux';
import { GET_LIST_USER } from '../../constants/globalVariable';
import { Link } from 'react-router-dom';
import { SearchUser } from './SearchUser/SearchUser';

const UserPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_LIST_USER });
  }, [dispatch]);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Link
          to={'/user/create'}
          type='button'
          className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2'
        >
          Create New User
        </Link>
        <SearchUser />
      </div>
      <ListUser />
    </div>
  );
};

export default UserPage;
