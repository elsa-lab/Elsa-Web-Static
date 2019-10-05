import PropTypes from 'prop-types';
import React, { Component } from 'react';

import IconImg from '../static/icon.png';
import './style/logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="mainRow d-none d-md-block">
        <a href="/">
          <div className="iconBox">
            <div className="iconImg">
              <img src={IconImg} alt="" />
            </div>
            <div className="iconText">
              <h3>NTHU</h3>
              <h3>ELSA</h3>
            </div>
          </div>
        </a>
        <h1>{this.props.content}</h1>
      </div>
    );
  }
}

Logo.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Logo;
