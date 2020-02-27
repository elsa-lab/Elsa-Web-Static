import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.css';
import deco from '../../static/ProjectDeco.svg';

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const Proposed = ({ content }) => (
  <div id="proposed">
    <div className="main-content">
      <h1> Proposed Methodology </h1>
      {content && (
        <div>
          <Slider className="d-none d-md-flex" {...settings}>
            {content &&
              content.map(({ id, title }) => (
                <div key={id} className="section-block">
                  <div className="section-container">
                    <div className="section-title">{title}</div>
                    <div className="seemore">See more</div>
                    <div className="project-deco">
                      <img src={deco} alt="" />
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          <div className="mobile-slide d-block d-md-none">
            {content &&
              content.map(({ id, title }) => (
                <div key={id} className="section-block">
                  <div className="section-container">
                    <div className="section-title">{title}</div>
                    <div className="seemore">See more</div>
                    <div className="project-deco">
                      <img src={deco} alt="" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
Proposed.propTypes = {
  content: PropTypes.array.isRequired,
};
export default Proposed;
