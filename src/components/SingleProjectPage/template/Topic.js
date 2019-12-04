import React from 'react';

const Topic = ({ projectName, content }) => (
  <div id="topic">
    <div className="main-content">
      <h3 className="topic-year">{content.year}</h3>
      <h1 className="topic-content">
        {projectName}
        <br />
        {content.subtitle}
      </h1>
      <h4 className="topic-author">Lee,Chun-Yi(TW)</h4>
    </div>
  </div>
);

export default Topic;
