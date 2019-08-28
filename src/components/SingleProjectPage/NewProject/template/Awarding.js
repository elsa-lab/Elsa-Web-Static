import React from 'react';
import './style/award.scss'
import award_1 from './award_1.png';
import award_2 from './award_2.png';

import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

const Awarding = ({ projectName }) => (
    <div className="section" id="award">
        <div className="content">
            <Fade top duration={600} distance="0.3em">
                <h1>Awarding</h1>
            </Fade>
            <Zoom delay={300} duration={600}>
                <hr/>
            </Zoom>
            <Fade delay={700}>
                <img src={award_1} alt=""/>
                <img src={award_2} style={{width: 100+"%"}} alt=""/>
            </Fade>
        </div>
    </div>
);


export default Awarding;
