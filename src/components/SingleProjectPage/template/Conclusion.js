import React from 'react';
import PropTypes from 'prop-types';

const Conclusion = ({ content }) => (
  <div id="conclusion">
    <div className="main-content">
      <h1>Conclusion</h1>
      <p className="conclue-content">{content}</p>
    </div>
    <div className="deco-square" />
  </div>
);

Conclusion.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Conclusion;
