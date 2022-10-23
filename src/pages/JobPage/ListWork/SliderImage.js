// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

const imageAddress =
  'https://mona.software/wp-content/uploads/2021/07/tam-quan-trong-cua-data-analyst-la-gi.jpg';

export default function SliderImage({ work }) {
  return (
    <div id='slider-img-card' className='h-full'>
      <Swiper
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
        }}
        // pagination={{
        //   clickable: true
        // }}
        // loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <img
            className='w-full h-full object-cover'
            src={work?.image || imageAddress}
            alt=''
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
