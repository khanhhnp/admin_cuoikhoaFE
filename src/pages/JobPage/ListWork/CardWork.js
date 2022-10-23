import { Dropdown, Menu } from 'antd';
import { AiFillEdit, AiFillStar } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';
import { Modal } from 'antd';
import SliderImage from './SliderImage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DELETE_JOB,
  GET_DETAIL_JOB,
} from '../../../constants/globalVariable';
import { Link } from 'react-router-dom';
const imageAddress =
  'https://mona.software/wp-content/uploads/2021/07/tam-quan-trong-cua-data-analyst-la-gi.jpg';

export const CardWork = ({ work }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link
              to={`/job/${work._id}`}
              onClick={() =>
                dispatch({ type: GET_DETAIL_JOB, payload: work._id })
              }
              className='flex items-center text-lg gap-x-2 py-2 px-3'
            >
              <AiFillEdit className='text-2xl text-gray-400' />
              <span>Edit Job</span>
            </Link>
          ),
          key: '0',
        },
        {
          label: (
            <div
              onClick={() => {
                setVisible(true);
              }}
              className='flex items-center text-lg gap-x-2 py-2 px-3'
            >
              <AiFillDelete className='text-2xl text-gray-400' />
              <span>Delete Job</span>
            </div>
          ),
          key: '1',
        },
      ]}
    />
  );
  return (
    <div id='card-recommand' className=' w-full cursor-pointer'>
      <Modal
        title='Delete Job'
        visible={visible}
        onOk={() => {
          setVisible(false);
          dispatch({ type: DELETE_JOB, payload: work._id });
        }}
        onCancel={() => setVisible(false)}
        okType={'danger'}
        okText={'Delete'}
      >
        <p className='text-lg font-semibold'>{`Do you want delete "${work.name}"`}</p>
      </Modal>
      <div className=' rounded-md overflow-hidden border bg-white w-full'>
        <div className='h-[310px]  w-full md:block hidden'>
          <SliderImage work={work} />
        </div>

        <div className='md:hidden flex gap-x-3 py-5 px-8'>
          <img
            className='w-[142px] h-[85px] object-cover border rounded-lg'
            src={work?.image || imageAddress}
            alt=''
          />
          <div className=' flex flex-col gap-y-1'>
            <p className='hover:text-green-400 transition-all cursor-pointer text-[#222325] text-xl font-normal'>
              {work?.name}
            </p>
            <div className='flex  items-center gap-x-1'>
              <AiFillStar className='text-xl text-[#ffbe5b]' />
              <span className='text-lg font-semibold '>
                <span className='text-[#ffbe5b]'>
                  {Math.floor(work?.rating || 0) > '5.0'
                    ? 5
                    : Math.floor(work?.rating || 0) + '.0'}
                </span>
                <span className='text-[#b5b6ba]'>
                  (
                  {isNaN(Math.ceil(work?.rating))
                    ? '0.0'
                    : Math.ceil(work?.rating)}
                  )
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className='md:p-4 px-8 pb-4'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-4'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={work?.image || imageAddress}
                alt='img'
              />
              <div className='text-md flex flex-col'>
                <span className='text-[#222325] text-[18px] font-semibold hover:underline cursor-pointer'>
                  {work?.name?.slice(0, 10)}
                </span>
                <span className='text-[#74767e] '>
                  Level 2 Seller
                </span>
                <span className='text-[#ffbe5b] hidden'>
                  Top Rated Seller
                </span>
              </div>
            </div>
            <div className='md:hidden flex items-center gap-x-2'>
              <span className='text-md font-semibold'>
                STARTING AT
              </span>
              <span className='text-2xl font-semibold'>
                US${work?.price}
              </span>
            </div>
          </div>
          <p className='my-4 md:block hidden hover:text-green-400 transition-all cursor-pointer text-[#222325] text-[18px] font-normal'>
            {work?.name?.slice(0, 30)}...
          </p>
          <div className='md:flex hidden  items-center gap-x-1'>
            <AiFillStar className='text-xl text-[#ffbe5b]' />
            <span className='text-lg font-semibold '>
              <span className='text-[#ffbe5b]'>
                {Math.floor(work?.rating || 0) > '5.0'
                  ? 5
                  : Math.floor(work?.rating || 0) + '.0'}
              </span>
              <span className='text-[#b5b6ba]'>
                (
                {isNaN(Math.ceil(work?.rating))
                  ? '0.0'
                  : Math.ceil(work?.rating)}
                )
              </span>
            </span>
          </div>
        </div>
        <div className='border-t  p-4 md:flex hidden items-center justify-between'>
          <div className='text-2xl flex items-center gap-x-2'>
            <Dropdown
              placement='topLeft'
              overlay={menu}
              trigger={['click']}
            >
              <GiHamburgerMenu className='cursor-pointer text-gray-400' />
            </Dropdown>
          </div>
          <div className=' flex items-center gap-x-2'>
            <span className='text-md font-semibold'>STARTING AT</span>
            <span className='text-2xl font-semibold'>
              US${work?.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
