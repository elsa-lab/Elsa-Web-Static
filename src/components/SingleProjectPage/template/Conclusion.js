import React from 'react';
import './style/conclusion.scss';

import pros1 from '../../static/System_structure_img_green.png'

import Fade from 'react-reveal/Fade';

const Conclusion = ({ projectName, content }) => (
    <div className="section" id="Conclusion">
        <Fade top duration={600} distance="0.3em">
            <h1>Experimental Results</h1>
        </Fade>
        <Fade delay={300} cascade duration={1000}>
            <div className="cardContent">
                <div className="card">
                    <img src={pros1} alt=""/>
                    <h1 className="content">{content[0].title}</h1>
                </div>
                <div className="card">
                    <img src={pros1} alt=""/>
                    <h1 className="content">{content[1].title}</h1>
                </div>
                <div className="card">
                    <img src={pros1} alt=""/>
                    <h1 className="content">{content[2].title}</h1>
                </div>
            </div>
        </Fade>
    </div>

);


export default Conclusion;
