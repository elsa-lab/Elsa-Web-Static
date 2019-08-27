import React from 'react';
import './style/video.scss';


const Video = ({ projectName }) => (
    <div className="section" id="video">
        <h1>Video<br></br>Overview</h1>
        <div className="video-block">
            <iframe title="Video-overview" src="https://www.youtube.com/embed/_OqdnG4AII8" frameBorder="0"></iframe>
        </div>
    </div>
);


export default Video;
