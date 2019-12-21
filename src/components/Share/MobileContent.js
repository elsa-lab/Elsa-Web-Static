import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MobileContent extends Component {
  render() {
    return (
      <div
        style={{ backgroundColor: this.props.color }}
        className="mobile-nav-content row justify-content-start d-md-none"
      >
        <hr className="col-2 col-sm-3" />
        <b className="col-8">Home</b>
    <h1 className="col-12">{this.props.content}</h1>
      </div>
    );
  }
}

MobileContent.propTypes = {
  color: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default MobileContent;
