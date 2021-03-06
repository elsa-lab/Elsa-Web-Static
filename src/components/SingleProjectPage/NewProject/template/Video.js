import React from 'react';
import './style/video.scss';

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const Video = ({ projectName, videoUrl }) => (
    <div className="section" id="video">
        <Fade top duration={600} distance="0.3em">
            <h1>Video<br></br>Overview</h1>
        </Fade>
        <div className="video-block">
            <Zoom>
                <iframe title="Video-overview" src={videoUrl} frameBorder="0"
                    allowFullScreen='True' webkitallowfullscreen='True' mozallowfullscreen='True'></iframe>
            </Zoom>
        </div>
    </div>
);


export default Video;
