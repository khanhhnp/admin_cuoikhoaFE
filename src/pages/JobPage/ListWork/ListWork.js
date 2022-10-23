import { Pagination } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardWork } from './CardWork';

export const ListWork = () => {
  const [page, setPage] = useState(0);

  const { listWork } = useSelector(
    (state) => state.listWorkPageReducer
  );

  return (
    <div>
    
      <section className='text-gray-600 body-font'>
        <div className='container py-14 mx-auto'>
          <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 '>
            {listWork[page] &&
              listWork[page].length > 0 &&
              listWork[page].map((work, i) => {
                return <CardWork work={work} key={i} />;
              })}
          </div>

          <div
            id='pagination-list-work'
            className='flex justify-center items-center mt-10'
          >
            <Pagination
              onChange={(value) => setPage(value - 1)}
              showSizeChanger={false}
              defaultCurrent={1}
              pageSize={1}
              total={listWork.length}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
