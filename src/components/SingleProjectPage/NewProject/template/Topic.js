import React from 'react';
import './style/topic.scss';
import cover from '../../../static/System_structure_img_square.jpg';

const Topic = ({ projectName, content }) => (
    <div className="section" id="Topic">
        <div className="colorBG">
            <div className="row">
                <div className="homeImage">
                    <img alt="" src={cover} />
                </div>
                <div className="col">
                    <h1 className="topic title">{content.title}</h1>
                    <h1 className="topic year">{content.year}</h1>
                    <p className="topic content">{content.description}</p>
                </div>
            </div>

        </div>
    </div>

);


export default Topic;
