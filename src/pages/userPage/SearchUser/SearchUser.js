import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH_USER_BY_NAME } from '../../../constants/globalVariable';

export const SearchUser = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchValue((values) => ({ ...values, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(searchValue);
        dispatch({
          type: SEARCH_USER_BY_NAME,
          payload: {
            ...searchValue,
            skip: 0,
          },
        });
      }}
      className='w-[50%] flex items-center'
    >
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'
      >
        Search
      </label>
      <div className='relative grow'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <input
          type='search'
          name='name'
          value={searchValue.name || ''}
          onChange={handleChange}
          id='default-search'
          className='block p-4 pl-10 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search User ...'
        />
      </div>
      <div className='ml-4'>
        <input
          type='number'
          name='limit'
          value={searchValue.limit || 10}
          onChange={handleChange}
          id='default-search'
          className='block p-4 pl-10 w-32 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Limit'
        />
      </div>
      <button
        className='ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-4 mr-2'
        type='submit'
      >
        Search
      </button>
    </form>
  );
};
