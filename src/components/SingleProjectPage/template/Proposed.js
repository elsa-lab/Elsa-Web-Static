import React from 'react';
import Swiper from 'react-id-swiper';

import 'react-id-swiper/lib/styles/scss/swiper.scss';
import deco from '../../static/ProjectDeco.svg';

const params = {
  slidesPerView: 3,
  spaceBetween: 80,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
};

const Proposed = ({ content }) => (
  <div id="proposed">
    <div className="main-content">
      <h1> Proposed Methodology </h1>
      <Swiper {...params}>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
        <div className="section-block">
          <div className="section-title">{content && content[0].title}</div>
          <div className="seemore">See more</div>
          <div className="project-deco">
            <img src={deco} alt="" />
          </div>
        </div>
      </Swiper>
    </div>
  </div>
);

export default Proposed;
