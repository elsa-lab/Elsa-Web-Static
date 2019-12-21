import PropTypes from 'prop-types';
import React, { Component } from 'react';

class RenderBlock extends Component {
  render() {
    return (
      <a key={id} href={`/courses/${id}`}>
        <div className="media mt-3 course-block justify-content-center align-items-center">
          <div
            className={`media-content col-6 col-md-7 order-sm-1 ${
              changeOrder ? 'order-1' : 'order-2'
            }`}
          >
            <h6>
              {year} {seasonText}
            </h6>
            <h5>{title}</h5>
            <h6 className="course-id">{course_no}</h6>
          </div>
          <div
            className={`img-area col-6 col-md-5 order-sm-2 ${
              changeOrder ? 'order-2' : 'order-1'
            }`}
          >
            <img src={landingImage} className="course-img" alt="" />
          </div>
        </div>
      </a>
    );
  }
}

export default RenderBlock;
