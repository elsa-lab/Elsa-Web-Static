import React from 'react';

const Video = ({ videoUrl }) => (
  <div id="video">
    <div className="video-block">
      <h1>Video Overview</h1>
      <iframe
        title="Video-overview"
        src={videoUrl}
        frameBorder="0"
        allowFullScreen="True"
        webkitallowfullscreen="True"
        mozallowfullscreen="True"
      />
    </div>
    <div className="deco-square" />
  </div>
);

export default Video;
