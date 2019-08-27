import React from 'react';
import './style/abstract.scss'
import book from '../../../static/book.jpg'

const Abstract = ({ projectName, content }) => (
    <div className="section" id="abstract">
        <div className="flex">
            <div className="left">
                <img src={book} alt=""/>
            </div>
            <div className="right">
                <h1>Abstract</h1>
                <p>{content[0]}</p>
            </div>
        </div>
    </div>
);


export default Abstract;
