import React, { useEffect } from 'react';
import { ListWork } from './ListWork/ListWork';
import { useDispatch } from 'react-redux';
import { GET_LIST_WORK } from '../../constants/globalVariable';
import { SearchJob } from './SearchJob';
import { Link } from 'react-router-dom';

const JobPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_LIST_WORK });
  }, [dispatch]);
  return (
    <div>
      <div className='container mx-auto pt-10 pb-5 px-5'>
        <div className='flex justify-between items-center'>
          <SearchJob />
          <Link
            to={'/job/create'}
            type='button'
            className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2'
          >
            Create New Job
          </Link>
        </div>
        <ListWork />
      </div>
    </div>
  );
};

export default JobPage;
