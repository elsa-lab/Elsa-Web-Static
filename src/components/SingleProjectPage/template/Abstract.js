import React from 'react';
import PropTypes from 'prop-types';

const Abstract = ({ content }) => (
  <div id="abstract">
    <div className="main-content">
      <h1>Abstract</h1>
      <p>{content}</p>
    </div>
    <div className="deco-square" />
  </div>
);

Abstract.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Abstract;
