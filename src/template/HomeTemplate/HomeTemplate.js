import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const HomeTemplate = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex flex-1 '>
        <div className='w-[300px]'>
          <Sidebar />
        </div>
        <div className='flex-1 bg-white p-8'>{children}</div>
      </div>
    </div>
  );
};
