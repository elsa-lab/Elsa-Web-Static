import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { Row } from 'antd';
import '../../App.scss'
import Header from '../../../Share/Header';
import settings from '../../../../settings';
import { notebook } from '../../../size';

import Comment from './Comment';

class PdfPage extends Component {
    state = {
        id: "",
        title: "",
        description: "",
        lecture_number: "",
        page: [],
        lecture_file: {},
        attach_files: [],
        course: {},
        created_at: "",
        updated_at: "",
        current: 0
    };
    setCurrent = (e) => {
        this.setState({current: e})
    }
    componentDidMount() {
        const {
            params: { lecture_id },
        } = this.props;
        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        });

        ins
        .get(`lectures/${lecture_id}`)
        .then(res => {

            this.setState({
                id: res.data.id,
                title: res.data.title,
                description: res.data.description,
                lecture_number: res.data.lecture_number,
                page: res.data.pages,
                lecture_file: res.data.lecture_file,
                attach_files: res.data.attach_files,
                course: res.data.course,
                created_at: res.data.created_at,
                updated_at: res.data.updated_at,
            });
        })
        .catch(error => {
            console.log(error);
        });

    }


    render() {
        const images = [];
        let seasonText;
        if(this.state.course.season === 0){
            seasonText = "Spring";
        } else {
            seasonText = "Fall";
        }
        for (let i = 0; i < this.state.page.length; i++) {
            images.push({
                original: settings.backend_url+'/'+this.state.page[i],
                thumbnail: settings.backend_url+'/'+this.state.page[i]
            });
        }
        return (
            <Row>
                <MediaQuery query={`(max-width: ${notebook})`}>
                    {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
                </MediaQuery>

                <div className="title-content">
                    <h1>{this.state.title}</h1>
                    <h3>{this.state.course.year} | {seasonText}</h3>
                </div>
                <ImageGallery onSlide={this.setCurrent} startIndex={this.state.current} showIndex={true} thumbnailPosition="left" slideOnThumbnailOver={false} showPlayButton={false} showBullets={true} showNav={false} infinite={false} items={images} />
                <Comment id={this.props.params.lecture_id} lectureId={this.props.params.lecture_id} nowPage={this.state.current}/>
            </Row>

        );
    }
}

PdfPage.propTypes = {
    params: PropTypes.shape({
        lecture_id: PropTypes.string.isRequired,
    }).isRequired,
};

export default PdfPage;
