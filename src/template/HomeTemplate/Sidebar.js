import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className='flex flex-col h-full pt-5 p-2 w-full bg-slate-700  text-white'>
      <div className='space-y-3'>
        <div className='text-center'>
          <h2 className='text-white  text-3xl font-semibold'>
            Dashboard
          </h2>
        </div>

        <div className='flex-1'>
          <ul className='pt-2 pb-4 space-y-4 text-sm'>
            <Link
              to='/'
              className='rounded-sm py-3 pl-6 cursor-pointer hover:bg-slate-400 hover:text-white transition-all text-2xl flex items-center gap-x-6'
            >
              <FaUserFriends className='text-3xl' />
              <span className='font-semibold'>Users</span>
            </Link>
            <Link
              to='/category'
              className='rounded-sm py-3 pl-6 cursor-pointer hover:bg-slate-400 hover:text-white transition-all text-2xl flex items-center gap-x-6'
            >
              <BiCategoryAlt className='text-3xl' />
              <span className='font-semibold'>Category</span>
            </Link>
            <Link
              to='/job'
              className='rounded-sm py-3 pl-6 cursor-pointer hover:bg-slate-400 hover:text-white transition-all text-2xl flex items-center gap-x-6'
            >
              <MdWork className='text-3xl' />
              <span className='font-semibold'>AllJob</span>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
