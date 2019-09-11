import React from 'react';
import './style/award.scss'

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const Awarding = ({ projectName, imageUrl }) => (
    <div className="section" id="award">
        <div className="content">
            <Fade top duration={600} distance="0.3em">
                <h1>Awarding</h1>
            </Fade>
            <Zoom delay={300} duration={600}>
                <hr/>
            </Zoom>
            <Fade delay={700}>
                <img src={imageUrl} alt=""/>
            </Fade>
        </div>
    </div>
);


export default Awarding;
