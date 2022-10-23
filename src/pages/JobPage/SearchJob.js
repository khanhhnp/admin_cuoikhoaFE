import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SEARCH_JOB_BY_NAME } from '../../constants/globalVariable';

export const SearchJob = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log(searchValue);
      }}
      className='w-[50%]'
    >
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'
      >
        Search
      </label>
      <div className='relative'>
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
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            dispatch({
              type: SEARCH_JOB_BY_NAME,
              payload: e.target.value,
            });
          }}
          id='default-search'
          className='block p-4 pl-10 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search Job ...'
        />
      </div>
    </form>
  );
};
