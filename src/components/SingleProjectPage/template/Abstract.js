import React from 'react';
import './style/abstract.scss'
import book from '../../static/book.jpg'

import Fade from 'react-reveal/Fade';

const Abstract = ({ projectName, content }) => (
    <div className="section" id="abstract">
        <div className="flex">
            <div className="left">
                <img src={book} alt=""/>
            </div>
            <div className="right">
                <Fade top duration={600} distance="0.3em">
                    <h1>Abstract</h1>
                    <p>{content}</p>
                </Fade>
            </div>
        </div>
    </div>
);


export default Abstract;
