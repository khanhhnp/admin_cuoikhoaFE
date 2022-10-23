import { Popover } from 'antd';

export const PopupCard = ({ icon, title }) => {
  return (
    <Popover
      content={
        <p className='py-1 px-2 text-white text-lg font-semibold'>
          {title}
        </p>
      }
    >
      {icon}
    </Popover>
  );
};
