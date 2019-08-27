import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
const Gallery = () => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };
  const thumbnailSwiperParams = {
    getSwiper: thumbnailSwiper,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true
  };
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);
  return (
    <div>
        <Swiper {...gallerySwiperParams}>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-0.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-1.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-2.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-3.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-4.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-5.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-6.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
        </Swiper>
        <Swiper {...thumbnailSwiperParams}>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-0.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-1.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-2.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-3.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-4.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-5.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
            <div>
                <img
                    src={`http://127.0.0.1:8000/static/test/2019/lecture01/GroupExercise.pdf/images/page-6.jpeg`}
                    className="swiper-lazy"
                    alt="img"
                />
            </div>
        </Swiper>
    </div>
  );
};
export default Gallery;
