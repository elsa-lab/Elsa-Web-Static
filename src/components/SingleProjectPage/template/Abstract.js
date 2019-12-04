import React from 'react';

const Abstract = ({ content }) => (
  <div id="abstract">
    <div className="main-content">
      <h1>Abstract</h1>
      <p>{content}</p>
    </div>
    <div className="deco-square" />
  </div>
);

export default Abstract;
