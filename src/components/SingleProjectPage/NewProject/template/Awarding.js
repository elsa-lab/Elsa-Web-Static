import React from 'react';
import './style/award.scss'
import award_1 from './award_1.png';
import award_2 from './award_2.png';

const Awarding = ({ projectName }) => (
    <div className="section" id="award">
        <div className="content">
            <h1>Award</h1>
            <img src={award_1} alt=""/>
            <img src={award_2} alt=""/>
        </div>
    </div>
);


export default Awarding;
