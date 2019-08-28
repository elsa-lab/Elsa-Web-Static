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
        title: '',
        imageRootUrl: '',
        page_size: '',
        allSlides: [],
        selected: 0,
        current: 0,
        courses: '',
    };
    setCurrent = (e) => {
        this.setState({current: e})
    }
    componentDidMount() {
        const {
            params: { course_id, content_id, file_id },
        } = this.props;

        const ins = axios.create({
            baseURL: settings.backend_url,
            timeout: 1000,
        });

        ins
        .get(`courses/${course_id}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                title: res.data.title,
            });
        })
        .catch(error => {
            console.log(error);
        });

        ins
        .get(`courses/${course_id}/contents/${content_id}`)
        .then(res => {
            // console.log(res.data);
            this.setState(res.data);
        })
        .catch(error => {
            console.log(error);
        });

        ins
        .get(`files/${file_id}`)
        .then(res => {
            // console.log(res.data);
            this.setState({
                imageRootUrl: res.data.image_root_url,
                page_size: res.data.page_size,
            });
            // console.log(res.data.page_size)
            this.displaySlides();
        })
        .catch(error => {
            console.log(error);
        });
    }


    render() {
        const images = [];
        for (let i = 0; i < this.state.page_size; i++) {
            images.push({
                original: this.state.imageRootUrl+'/page-'+i+'.jpeg',
                thumbnail: this.state.imageRootUrl+'/page-'+i+'.jpeg'
            });
        }
        const {
            params: { file_id },
        } = this.props;

        const {
            title,
            year,
            season,
            current,
        } = this.state;

        return (
            <Row>
                <MediaQuery query={`(max-width: ${notebook})`}>
                    {matches => (!matches ? <Header fontColor="#9b9b9b" /> : <></>)}
                </MediaQuery>

                <div className="title-content">
                    <h1>{title}</h1>
                    <h3>{year} | {season}</h3>
                </div>
                <ImageGallery onSlide={this.setCurrent} startIndex={current} showIndex={true} thumbnailPosition="left" slideOnThumbnailOver={false} showPlayButton={false} showBullets={true} showNav={false} infinite={false} items={images} />
                <Comment id={file_id} fileId={file_id} nowPage={current}/>
            </Row>

        );
    }
}

PdfPage.propTypes = {
    params: PropTypes.shape({
        course_id: PropTypes.string.isRequired,
        content_id: PropTypes.string.isRequired,
        file_id: PropTypes.string.isRequired,
    }).isRequired,
};

export default PdfPage;
